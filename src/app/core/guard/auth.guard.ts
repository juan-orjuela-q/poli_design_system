import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}
  
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.authService.getUser();
    
    if (user && user.accessToken) {
      // Usuario autenticado, permitir acceso
      return true;
    }
    
    // No autenticado, guardar URL solicitada y redirigir a login
    sessionStorage.setItem('redirectUrl', state.url);
    return this.router.createUrlTree(['/auth/login']);
  }
}
