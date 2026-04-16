import { Component, signal } from '@angular/core';
import { PageFooterComponent } from '../page-footer/page-footer.component';
import { NavLink } from '@shared/components/mobile-nav/mobile-nav.component';
import { SidenavComponent } from '@shared/components/sidenav/sidenav.component';
import { RouteDefinition } from '@layout/interfaces/route-definition.interface';
import { MobileNavPortalsComponent } from '@shared/components/mobile-nav-portals/mobile-nav-portals.component';

/**
 * Componente de sidebar para CPO (sin dependencias MSAL)
 * 
 * Versión simplificada de PageSidebarComponent
 * - No requiere autenticación
 * - Menú estático para las funcionalidades de CPO
 * - No usa MainService, NavigationService, ni UserProfileService
 */
@Component({
  selector: 'app-page-sidebar-cpo',
  imports: [SidenavComponent, PageFooterComponent, MobileNavPortalsComponent],
  templateUrl: './page-sidebar-cpo.component.html',
  styleUrl: './page-sidebar-cpo.component.scss'
})
export class PageSidebarCpoComponent {
  
  // Menú estático para CPO
  sidebarMenu = signal<RouteDefinition[]>([
    {
      icon: 'lock_reset',
      label: 'Cambio de clave',
      route: '/cpo/change-password'
    },
    {
      icon: 'lock_open_right',
      label: 'Recuperar contraseña',
      route: '/cpo/forgot-password'
    },
    {
      icon: 'person_alert',
      label: 'Recuperar usuario',
      route: '/cpo/forgot-username'
    }
  ]);
  
  // Información del proceso (estática para CPO)
  processName = signal('CPO');
  processIcon = signal('key');
  
  // Links para el footer (desktop y mobile)
  legalLinks: NavLink[] = [
    { ruta: '#', texto: 'Política de privacidad' },
    { ruta: '#', texto: 'Términos y condiciones' }
  ];

  constructor() {}
}
