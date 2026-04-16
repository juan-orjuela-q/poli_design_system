import { Injectable } from '@angular/core';
import { PERMISSIONS } from '@core/constants/global.constants';
import { SYSTEM_ROUTES } from '@core/constants/system-paths';
import { CryptoService } from '@core/services/crypto.service';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatePermissionsHelPer {


  constructor(private _crypto: CryptoService) { }

  /**
   * Valida el permiso desde los archivo .ts
   * @param permission *
   */
  public validatePermissionFunction(permission: string | string[]): boolean {
    const userPermissions = this.getUserPermissions();
    if (Array.isArray(permission)) {
      // Si tiene alguno de los permisos en el array
      return this.hasAnyPermission(userPermissions, permission);
    } else {
      // Si tiene el permiso específico
      return this.hasPermission(userPermissions, permission);
    }
  }

  // Método para obtener los permisos desde el localStorage
  public getUserPermissions(): string[] {
    const permissions = localStorage.getItem(PERMISSIONS);
    return permissions ? this._crypto.decrypt(permissions) : [];
  }

  // Método para verificar si el usuario tiene el permiso exacto
  private hasPermission(userPermissions: string[], permission: string): boolean {
    return userPermissions.includes(permission);
  }

  // Método para verificar si el usuario tiene un permiso que comienza con alguno de los prefijos
  private hasAnyPermission(userPermissions: string[], prefixes: string[]): boolean {
    return userPermissions.some(permission =>
      prefixes.some(prefix => permission.startsWith(prefix))
    );
  }
  /**
   *
   * Valida el Menú al cual tiene aceso el Usuario
   * @param {RouteDefinition} routes
   * @return {*}
   * @memberof ValidatePermissionsHelPer
   */
  public buildMenuFromRoutes(routes: Record<string, RouteDefinition>) {
    return Object.values(routes)
      .map(route => {
        // Rutas con hijos (módulos)
        if (route.children && Array.isArray(route.children)) {
          //const children = route.children.filter((child: any) => this.validatePermissionFunction(child.permissions?.access));
          const children = route.children;
          return children.length > 0 ? { ...route, children } : null;
        }
        // Rutas individuales
        const hasAccess = route.permissions?.access;
        //return hasAccess && this.validatePermissionFunction(hasAccess) ? route : null;

        return route;
      }).filter(Boolean); // Elimina nulls
  }

}
