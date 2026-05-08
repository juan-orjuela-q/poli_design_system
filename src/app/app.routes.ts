import { Route } from '@angular/router';
import { Page404Component } from '@pages/auth/screens/page404/page404.component';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/ds-playground/ds-playground.component').then((m) => m.DsPlaygroundComponent),
  },
  { path: '**', component: Page404Component },
];

