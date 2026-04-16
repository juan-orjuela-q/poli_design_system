import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageContentComponent } from '@layout/components/page-content/page-content.component';
import { PageHeaderCpoComponent } from '@layout/components/page-header-cpo/page-header-cpo.component';
import { PageSidebarCpoComponent } from '@layout/components/page-sidebar-cpo/page-sidebar-cpo.component';

/**
 * Layout para CPO (sin dependencias MSAL)
 * 
 * Versión del pages-layout que usa componentes CPO
 * sin dependencias de autenticación ni servicios MSAL
 */
@Component({
  selector: 'app-pages-layout-cpo',
  imports: [
    RouterOutlet,
    PageContentComponent,
    PageSidebarCpoComponent,
    PageHeaderCpoComponent
  ],
  templateUrl: './pages-layout-cpo.component.html',
  styleUrl: './pages-layout-cpo.component.scss'
})
export class PagesLayoutCpoComponent {
  constructor() {}
}
