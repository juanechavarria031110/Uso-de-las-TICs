import { Component, OnInit, OnDestroy, Inject } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service'; 
import { isPlatformBrowser } from '@angular/common'; 
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  usuario: string = '';
  password: string = '';
  warnings: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object  
  ) {}

  ngOnInit(): void {
    // Verificamos si estamos en el navegador antes de manipular el DOM
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('login-background');
    }
  }

  ngOnDestroy(): void {
    // Verificamos si estamos en el navegador antes de manipular el DOM
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('login-background');
    }
  }

  onLogin() {
    // Lógica de inicio de sesión
    if (!this.usuario || !this.password) {
      this.warnings = 'Por favor, ingrese su usuario y contraseña.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.usuario === this.usuario);

    if (!existingUser) {
      this.warnings = 'El usuario no existe.';
      return;
    }

    if (existingUser.password !== this.password) {
      this.warnings = 'Contraseña incorrecta.';
      return;
    }

    this.authService.login(existingUser);

    if (existingUser.tipoU === 'admin') {
      this.router.navigate(['/admin']);
    } else if (existingUser.tipoU === 'estudiante') {
      this.router.navigate(['/encuestas']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}