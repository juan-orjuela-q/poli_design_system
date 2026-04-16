import { Route } from '@angular/router';
import { AuthLayoutComponent } from '@layout/screens/auth-layout/auth-layout.component';
import { Page404Component } from '@pages/auth/screens/page404/page404.component';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'cpo/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTE),
  },
  {
    path: 'cpo',
    loadComponent: () =>
      import('./layout/screens/pages-layout-cpo/pages-layout-cpo.component').then((m) => m.PagesLayoutCpoComponent),
    loadChildren: () =>
      import('./pages/cpo/cpo.routes').then((m) => m.CPO_ROUTES),
  },
  { path: '**', component: Page404Component },
];

