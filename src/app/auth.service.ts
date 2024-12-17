import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthentication());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Verificar si hay un usuario autenticado en localStorage
  private checkAuthentication(): boolean {
    return typeof window !== 'undefined' && localStorage.getItem('loggedInUser') !== null;
  }

  // Iniciar sesión y almacenar el usuario en localStorage
  login(user: any): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Cerrar sesión y eliminar el usuario de localStorage
  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('loggedInUser');
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Obtener el usuario autenticado desde localStorage
  getAuthenticatedUser(): any {
    if (typeof window !== 'undefined' && localStorage) {
      return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    }
    return {}; 
  }

  // Verificar si el usuario está autenticado
  get isAuthenticatedSubjectValue(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Verificar si el usuario tiene tipoU "universitario"
  get isUniversitario(): boolean {
    const user = this.getAuthenticatedUser();
    return user && user.tipoU === 'universitario'; // Verifica si el tipoU es 'universitario'
  }

  // Verificar si el usuario tiene tipoU "admin"
  get isAdmin(): boolean {
    const user = this.getAuthenticatedUser();
    return user && user.tipoU === 'admin'; // Verifica si el tipoU es 'admin'
  }

  // Verificar si el usuario tiene acceso a la ruta de encuestas o admin
  get canAccessProtectedRoutes(): boolean {
    const user = this.getAuthenticatedUser();
    return user && (user.tipoU === 'admin'); // Solo los usuarios con tipo 'admin' pueden acceder a las rutas protegidas
  }
}
