import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule], // Agregar CommonModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProyectoTics';
  showHeaderFooter = true; // Controla la visibilidad del header y footer

  constructor(private router: Router) {
    // Observa los cambios de navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Comprueba si la ruta actual es '/register'
        this.showHeaderFooter = event.url !== '/register';
      });
  }
}
