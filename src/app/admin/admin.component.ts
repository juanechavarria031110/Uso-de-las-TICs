import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'] 
})
export class AdminComponent {
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', rol: 'Estudiante' },
    { id: 2, nombre: 'Ana Gómez', rol: 'Administrador' },
  ];

  universidades = [
    { id: 1, nombre: 'Universidad del Pacífico', ciudad: 'Lima' },
    { id: 2, nombre: 'Universidad Nacional', ciudad: 'Bogotá' },
  ];

  encuestas = [
    { id: 1, titulo: 'Encuesta de Satisfacción', estado: 'Activa' },
    { id: 2, titulo: 'Encuesta de Opinión', estado: 'Inactiva' },
  ];

  gestionarUsuarios(): void {
    console.log('Gestionar Usuarios', this.usuarios);
  }

  gestionarUniversidades(): void {
    console.log('Gestionar Universidades', this.universidades);
  }

  gestionarEncuestas(): void {
    console.log('Gestionar Encuestas', this.encuestas);
  }
}
