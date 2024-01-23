// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = await this.auth.authState.toPromise();

    if (user) {
      // Usuario autenticado, permitir el acceso
      return true;
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      return this.router.createUrlTree(['/login']);
    }
  }
}
