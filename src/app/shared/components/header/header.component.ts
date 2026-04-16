import { Component, Input, Optional } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";
import { Router } from '@angular/router';
// import { MainService } from '@pages/dashboard/services/main.service';
// import { Portal } from '@pages/dashboard/interfaces/portal.interface';

/**
 * **Header**
 *
 * Encabezado principal de la aplicación o sección. Incluye —de forma fija—
 * el logo institucional a la izquierda y un contenedor proyectado (`ng-content`)
 * a la derecha para alojar elementos como **Header Nav Item** y **Avatar**.
 *
 * ### Buenas prácticas
 * - El contenido que coloques dentro de `<app-header-nav>…</app-header-nav>`
 *   aparecerá en la zona derecha del header.
 * - Importa los componentes que uses en ese slot (por ejemplo, `HeaderNavItem`,
 *   `Avatar`) en el módulo/página donde declares el header.
 * - Si no se provee MainService, usa los @Input para configurar el portal.
 */
@Component({
  selector: 'app-header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ButtonComponent, IconComponent],
})
export class HeaderComponent {
  /** Nombre del portal a mostrar en el badge (opcional, usado cuando no hay MainService) */
  @Input() portalName?: string;
  
  /** Icono del badge del portal */
  @Input() portalIcon: string = 'badge';
  
  /** Tipo/color del badge del portal */
  @Input() type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'destructiveOutline' | 'success' | 'warning' | 'cat' | 'flat' = 'warning';
  
  /** Ruta de navegación al hacer click en el badge */
  @Input() dashboardRoute: string = '/main';

  constructor(
    private readonly router: Router
    // @Optional() private readonly _mainService?: MainService
  ) { }

  goDashboard() {
    if (this.router.url !== this.dashboardRoute) {
      this.router.navigate([this.dashboardRoute]);
    }
  }

  get portal(): any | null {
    // return this._mainService?.getPortalLocal() || null;
    return null;
  }
  
  get displayPortalName(): string {
    return this.portalName || this.portal?.name || 'Portal';
  }
}
