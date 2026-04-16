import { Injectable, signal } from '@angular/core';
import { AuthService } from '@pages/auth/services/auth.service';

/**
 * Interfaz para datos parseados del Distinguished Name (DN)
 */
export interface ParsedDN {
  role: string;
  organizationalUnit: string;
  fullDN: string;
}

/**
 * Interfaz para información completa del usuario
 */
export interface UserProfile {
  name: string;
  email: string;
  role: string;
  organizationalUnit: string;
  dn: string;
}

/**
 * Servicio centralizado para gestionar información del perfil de usuario
 * 
 * Responsabilidades:
 * - Obtener y cachear datos del usuario autenticado
 * - Parsear el Distinguished Name (DN) para extraer rol y unidad organizacional
 * - Proporcionar información de usuario de forma reactiva
 * - Eliminar duplicación de lógica de parseo de DN
 * 
 * @example
 * ```typescript
 * constructor(private userProfile: UserProfileService) {
 *   // Obtener nombre de usuario
 *   const name = this.userProfile.userName();
 *   
 *   // Obtener rol parseado
 *   const role = this.userProfile.userRole();
 *   
 *   // Obtener perfil completo
 *   const profile = this.userProfile.profile();
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  
  // Estado reactivo del perfil de usuario
  private _profile = signal<UserProfile | null>(null);
  
  // Signals computados para acceso rápido a propiedades específicas
  readonly profile = this._profile.asReadonly();
  readonly userName = signal<string>('');
  readonly userEmail = signal<string>('');
  readonly userRole = signal<string>('');
  readonly userOrganizationalUnit = signal<string>('');
  readonly userInitials = signal<string>('');

  constructor(private authService: AuthService) {
    this.loadUserProfile();
  }

  /**
   * Carga el perfil del usuario desde AuthService
   * Se ejecuta automáticamente al instanciar el servicio
   */
  loadUserProfile(): void {
    try {
      const user = this.authService.getUser();
      
      if (!user || !user.account) {
        console.warn('[UserProfileService] No se pudo obtener usuario autenticado');
        this.clearProfile();
        return;
      }

      const { name, username, idTokenClaims } = user.account;
      const dn = idTokenClaims?.DN || '';
      
      // Parsear DN para obtener rol y unidad organizacional
      const parsedDN = this.parseDN(dn);

      // Construir perfil completo
      const profile: UserProfile = {
        name: name || '',
        email: username || '',
        role: parsedDN.role,
        organizationalUnit: parsedDN.organizationalUnit,
        dn: parsedDN.fullDN
      };

      // Actualizar signals
      this._profile.set(profile);
      this.userName.set(profile.name);
      this.userEmail.set(profile.email);
      this.userRole.set(profile.role);
      this.userOrganizationalUnit.set(profile.organizationalUnit);
      this.userInitials.set(this.getInitials(profile.name));

    } catch (error) {
      console.error('[UserProfileService] Error al cargar perfil de usuario', error);
      this.clearProfile();
    }
  }

  /**
   * Parsea el Distinguished Name (DN) para extraer información jerárquica
   * 
   * Formato esperado del DN: "CN=User,OU=Rol,OU=Unidad,..."
   * 
   * @param dn - Distinguished Name del usuario
   * @returns Objeto con rol, unidad organizacional y DN completo
   * 
   * @example
   * ```typescript
   * const parsed = this.userProfile.parseDN('CN=Juan Perez,OU=Admin,OU=TI,DC=ejemplo,DC=com');
   * // { role: 'Admin', organizationalUnit: 'TI', fullDN: '...' }
   * ```
   */
  parseDN(dn: string): ParsedDN {
    const result: ParsedDN = {
      role: '',
      organizationalUnit: '',
      fullDN: dn
    };

    if (!dn) {
      return result;
    }

    try {
      // Dividir el DN por comas
      const parts = dn.split(',').map(part => part.trim());
      
      // Filtrar solo las partes que son OU (Organizational Unit)
      const ouParts = parts
        .filter(part => part.startsWith('OU='))
        .map(part => part.substring(3)); // Remover "OU="

      // El primer OU es el rol, el segundo es la unidad organizacional
      if (ouParts.length > 0) {
        result.role = ouParts[0];
      }
      
      if (ouParts.length > 1) {
        result.organizationalUnit = ouParts[1];
      }

    } catch (error) {
      console.error('[UserProfileService] Error al parsear DN', error);
    }

    return result;
  }

  /**
   * Obtiene las iniciales del nombre de usuario
   * 
   * @param name - Nombre completo del usuario
   * @returns Iniciales (máximo 2 letras)
   * 
   * @example
   * ```typescript
   * this.getInitials('Juan Pérez'); // 'JP'
   * this.getInitials('María'); // 'M'
   * ```
   */
  getInitials(name: string): string {
    if (!name) return '';

    const words = name.trim().split(' ').filter(word => word.length > 0);
    
    if (words.length === 0) return '';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    
    // Tomar primera letra de la primera y última palabra
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Limpia el perfil del usuario
   */
  clearProfile(): void {
    this._profile.set(null);
    this.userName.set('');
    this.userEmail.set('');
    this.userRole.set('');
    this.userOrganizationalUnit.set('');
    this.userInitials.set('');
  }

  /**
   * Recarga el perfil del usuario desde AuthService
   * Útil después de cambios en la autenticación
   */
  reload(): void {
    this.loadUserProfile();
  }

  /**
   * Verifica si hay un perfil de usuario cargado
   * 
   * @returns true si existe perfil, false si no
   */
  hasProfile(): boolean {
    return this._profile() !== null;
  }

  /**
   * Obtiene el nombre completo del usuario de forma síncrona
   * 
   * @returns Nombre del usuario o string vacío
   */
  getUserNameSync(): string {
    return this.userName();
  }

  /**
   * Obtiene el email del usuario de forma síncrona
   * 
   * @returns Email del usuario o string vacío
   */
  getUserEmailSync(): string {
    return this.userEmail();
  }

  /**
   * Obtiene el rol del usuario de forma síncrona
   * 
   * @returns Rol del usuario o string vacío
   */
  getUserRoleSync(): string {
    return this.userRole();
  }

  /**
   * Obtiene la unidad organizacional del usuario de forma síncrona
   * 
   * @returns Unidad organizacional o string vacío
   */
  getUserOUSync(): string {
    return this.userOrganizationalUnit();
  }

  /**
   * Obtiene las iniciales del usuario de forma síncrona
   * 
   * @returns Iniciales del usuario o string vacío
   */
  getUserInitialsSync(): string {
    return this.userInitials();
  }
}
