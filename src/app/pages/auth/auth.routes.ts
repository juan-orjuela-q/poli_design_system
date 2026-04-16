import { Route } from "@angular/router";
export const AUTH_ROUTE: Route[] = [
  {
    path: "login",
     loadComponent: () => import('../auth/screens/login/login.component').then(m => m.LoginComponent)
  },
];
