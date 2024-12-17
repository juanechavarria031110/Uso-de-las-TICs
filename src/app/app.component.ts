import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ProyectoTics';
  showHeaderFooter = true;
  isAuthenticated = false;
  isAdmin = false;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private titleService: Title,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Nos suscribimos al estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      const user = this.authService.getAuthenticatedUser();
      this.isAdmin = user.tipoU === 'admin'; // Verifica si es admin
    });

    // Observa los cambios de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const routeData = this.router.routerState.snapshot.root.firstChild?.data;
        if (routeData && routeData['title']) {
          this.titleService.setTitle(routeData['title']);
        }

        // Control de visibilidad de header y footer
        this.showHeaderFooter = event.url !== '/register' && event.url !== '/login';
      });
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout(); // Llamamos al servicio de logout
    this.router.navigate(['/']); // Redirige a la página de inicio
  }

  ngOnDestroy(): void {
    // Nos desuscribimos para evitar memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
