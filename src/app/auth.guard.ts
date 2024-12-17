import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isAuthenticatedSubjectValue;

    // Si el usuario está autenticado y está intentando acceder a 'login' o 'register', redirige a home
    if (isAuthenticated && (route.url[0].path === 'login' || route.url[0].path === 'register')) {
      alert('Ya has iniciado sesión. No puedes acceder a estas páginas.');
      this.router.navigateByUrl('/home');
      return false;
    }

    // Si no está autenticado y está intentando acceder a rutas protegidas (admin, encuestas, userencuesta), redirige a login
    if (!isAuthenticated && (route.url[0].path === 'admin' || route.url[0].path === 'encuestas' || route.url[0].path === 'userencuesta')) {
      this.router.navigateByUrl('/login');
      return false;
    }

    // Si el usuario no es admin y está intentando acceder a la ruta de 'admin' o 'encuestas', redirige a home
    if (isAuthenticated && (route.url[0].path === 'admin' || route.url[0].path === 'encuestas') && !this.authService.canAccessProtectedRoutes) {
      this.router.navigateByUrl('/home');
      alert('No tienes permisos para acceder a esta página.');
      return false;
    }

    // Permitir el acceso si el usuario está autenticado o cumple las condiciones
    return true;
  }
}
