import { Component, OnInit } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Title } from '@angular/platform-browser';

@Component({ 
  selector: 'app-register', 
  standalone: true, 
  imports: [FormsModule, RouterLink, CommonModule], 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.scss'] 
}) 

export class RegisterComponent implements OnInit { 

  // Propiedades para el formulario
  usuario: string = '';
  tipoU: string = 'universitario'; 
  password: string = '';
  confirmPassword: string = '';
  warnings: string = '';  // Mensajes de advertencia

  constructor(private router: Router, private titleService: Title) {}

  // Cuando el formulario es enviado se hacen validaciones a traves de esta funcion
  onRegister() {
    if (!this.usuario || !this.tipoU || !this.password || !this.confirmPassword) {
      this.warnings = 'Por favor, complete todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.warnings = 'Las contraseñas no coinciden.';
      return;
    }

    const newUser = {
      usuario: this.usuario,
      tipoU: this.tipoU,  
      password: this.password,
    };

    let users = JSON.parse(localStorage.getItem('users') || '[]'); 

    const existingUser = users.find((user: any) => user.usuario === this.usuario);
    if (existingUser) {
      this.warnings = 'El usuario ya está registrado.';
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar campos después de registrar
    this.usuario = '';
    this.tipoU = '';
    this.password = '';
    this.confirmPassword = '';

    this.router.navigate(['/login']);
  }

  // Función que detecta si el usuario ya está registrado
  checkUserExistence() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.usuario === this.usuario);
    if (existingUser) {
      this.warnings = 'El usuario ya está registrado.';
    } else {
      this.warnings = ''; // Si no hay conflicto, limpia la advertencia
    }
  }

  // Cambiar el título de la pestaña cuando se cargue el componente
  ngOnInit() {
    this.titleService.setTitle('Registrar usuario'); // Establecer el título dinámicamente
  }
}