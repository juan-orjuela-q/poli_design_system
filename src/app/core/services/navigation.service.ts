import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';

/**
 * Servicio centralizado para gestionar la navegación del aplicativo
 * 
 * Responsabilidades:
 * - Mantener estado reactivo del menú actual
 * - Gestionar información del proceso/aplicación actual
 * - Sincronizar navegación entre desktop y mobile
 * - Proporcionar datos de navegación a todos los componentes
 * 
 * @example
 * ```typescript
 * constructor(private navigationService: NavigationService) {
 *   // Obtener items del menú
 *   const menu = this.navigationService.menuItems();
 *   
 *   // Actualizar menú desde un proceso
 *   this.navigationService.loadMenuFromProcess(process);
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  // Estado reactivo con Signals
  private _menuItems = signal<RouteDefinition[]>([]);
  private _processName = signal<string>('');
  private _processIcon = signal<string>('');
  private _portalName = signal<string>('');
  private _portalIcon = signal<string>('');
  
  // Getters públicos como signals de solo lectura
  readonly menuItems = this._menuItems.asReadonly();
  readonly processName = this._processName.asReadonly();
  readonly processIcon = this._processIcon.asReadonly();
  readonly portalName = this._portalName.asReadonly();
  readonly portalIcon = this._portalIcon.asReadonly();
  
  // Computed signal para verificar si hay menú cargado
  readonly hasMenu = computed(() => this._menuItems().length > 0);
  
  // Computed signal para verificar si hay proceso cargado
  readonly hasProcess = computed(() => this._processName().length > 0);

  constructor(private router: Router) {
    this.initNavigationListener();
  }

  /**
   * Inicializa el listener de navegación para detectar cambios de ruta
   * Útil para recargar menú cuando sea necesario
   */
  private initNavigationListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Los componentes pueden suscribirse a cambios de ruta si necesitan
        // reaccionar a navegación
      });
  }

  /**
   * Normaliza una ruta eliminando duplicados y asegurando formato correcto
   * 
   * @param route - Ruta a normalizar
   * @returns Ruta normalizada
   * 
   * @example
   * ```typescript
   * normalizeRoute('/pages/pages/flexibility') // -> '/pages/flexibility'
   * normalizeRoute('pages/flexibility') // -> '/pages/flexibility'
   * ```
   */
  private normalizeRoute(route: string): string {
    if (!route) return '/';
    
    // Asegurar que empiece con /
    let normalized = route.startsWith('/') ? route : `/${route}`;
    
    // Eliminar duplicados de segmentos consecutivos
    // Ejemplo: /pages/pages/flexibility -> /pages/flexibility
    const segments = normalized.split('/').filter(s => s.length > 0);
    const uniqueSegments: string[] = [];
    
    for (let i = 0; i < segments.length; i++) {
      // Solo agregar si no es igual al segmento anterior
      if (i === 0 || segments[i] !== segments[i - 1]) {
        uniqueSegments.push(segments[i]);
      }
    }
    
    return '/' + uniqueSegments.join('/');
  }

  /**
   * Carga el menú desde un objeto Process (estructura del backend)
   * 
   * @param process - Objeto con estructura: { name, icon, menus: Menu[] }
   * 
   * @example
   * ```typescript
   * const process = this.mainService.getProcess();
   * this.navigationService.loadMenuFromProcess(process);
   * ```
   */
  loadMenuFromProcess(process: any): void {
    if (!process || !process.menus) {
      console.warn('[NavigationService] Process inválido o sin menús', process);
      this.clearMenu();
      return;
    }

    // Actualizar información del proceso
    this._processName.set(process.name || '');
    this._processIcon.set(process.icon || 'apps');

    // Transformar menus del backend a RouteDefinition
    const menuItems: RouteDefinition[] = process.menus.map((menu: any) => {
      const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;
      
      return {
        label: menu.title,
        route: this.normalizeRoute(menu.route),
        icon: menu.icon || 'folder',
        moduleKey: menu.windowTitle,
        children: hasSubMenus ? menu.subMenus.map((subMenu: any) => ({
          label: subMenu.title,
          route: this.normalizeRoute(subMenu.route),
          icon: subMenu.icon || 'arrow_right',
          moduleKey: subMenu.windowTitle,
        })) : undefined
      };
    });

    this._menuItems.set(menuItems);
  }

  /**
   * Carga el menú desde un array de RouteDefinition directamente
   * Útil para menús estáticos o preconstruidos
   * 
   * @param items - Array de RouteDefinition
   * 
   * @example
   * ```typescript
   * this.navigationService.loadMenu(SYSTEM_ROUTES);
   * ```
   */
  loadMenu(items: RouteDefinition[]): void {
    this._menuItems.set(items || []);
  }

  /**
   * Establece la información del portal institucional
   * 
   * @param name - Nombre del portal
   * @param icon - Icono del portal (opcional)
   */
  setPortalInfo(name: string, icon: string = 'home'): void {
    this._portalName.set(name);
    this._portalIcon.set(icon);
  }

  /**
   * Establece la información del proceso/aplicación actual
   * 
   * @param name - Nombre del proceso
   * @param icon - Icono del proceso
   */
  setProcessInfo(name: string, icon: string = 'apps'): void {
    this._processName.set(name);
    this._processIcon.set(icon);
  }

  /**
   * Actualiza solo los items del menú sin afectar otra información
   * 
   * @param items - Nuevos items del menú
   */
  updateMenuItems(items: RouteDefinition[]): void {
    this._menuItems.set(items);
  }

  /**
   * Limpia todo el menú y la información del proceso
   */
  clearMenu(): void {
    this._menuItems.set([]);
    this._processName.set('');
    this._processIcon.set('');
  }

  /**
   * Limpia solo la información del portal
   */
  clearPortalInfo(): void {
    this._portalName.set('');
    this._portalIcon.set('');
  }

  /**
   * Reinicia todo el estado del servicio
   */
  reset(): void {
    this.clearMenu();
    this.clearPortalInfo();
  }

  /**
   * Obtiene un item específico del menú por su ruta
   * 
   * @param route - Ruta a buscar
   * @returns RouteDefinition o undefined si no se encuentra
   */
  getMenuItemByRoute(route: string): RouteDefinition | undefined {
    const items = this._menuItems();
    
    for (const item of items) {
      if (item.route === route) return item;
      
      if (item.children) {
        const child = item.children.find((c: RouteDefinition) => c.route === route);
        if (child) return child;
      }
    }
    
    return undefined;
  }

  /**
   * Verifica si una ruta específica existe en el menú actual
   * 
   * @param route - Ruta a verificar
   * @returns true si existe, false si no
   */
  hasRoute(route: string): boolean {
    return this.getMenuItemByRoute(route) !== undefined;
  }
}
