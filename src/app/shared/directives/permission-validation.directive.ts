import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ValidatePermissionsHelPer } from '@core/helpers/validate-permissions';

@Directive({
  selector: '[permissionValidation]'
})
export class PermissionValidationDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _validatePermissionsHelPer: ValidatePermissionsHelPer
  ) { }

  @Input() set permissionValidation(permission: string | string[]) {
    const userPermissions = this._validatePermissionsHelPer.getUserPermissions();

    if (Array.isArray(permission)) {
      if (this.hasAnyPermission(userPermissions, permission)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else {
      if (this.hasPermission(userPermissions, permission)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }

  // Método para verificar si el usuario tiene el permiso exacto
  private hasPermission(userPermissions: string[], permission: string): boolean {
    return userPermissions.includes(permission);
  }

  // Método para verificar si el usuario tiene un permiso que comienza con alguno de los prefijos
  private hasAnyPermission(userPermissions: string[], prefixes: string[]): boolean {
    // Verificar si todos los prefijos en `prefixes` coinciden con algún permiso en `userPermissions`
    return userPermissions.some(permission =>
      prefixes.some(prefix => permission.startsWith(prefix))
    );
  }


}
