import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  colegios: any[] = []; // Array de colegios
  encuestas: any[] = []; // Array de encuestas
  newUser: any = { id: null, usuario: '', tipoU: '', password: '' };
  newSchool: any = { id: null, nombre: '', ciudad: '', codigoDane: '' }; // Nuevo objeto para colegios
  newSurvey: any = { id: null, titulo: '', descripcion: '', imagen: '', preguntas: [] }; // Nuevo objeto para encuestas
  showCrud: boolean = false;
  showWelcome: boolean = true;
  currentTab: string = ''; // Para controlar la pestaña activa (usuarios, colegios o encuestas)
  errorMessage: string = '';
  currentUser: any = null;

  constructor() {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.currentUser = JSON.parse(loggedInUser); 
    }
  }

  loadUsers(): void {
    const users = localStorage.getItem('users');
    if (users) {
      this.usuarios = JSON.parse(users);
    }
    this.showCrud = true; 
    this.currentTab = 'usuarios'; // Activar la pestaña de usuarios
    this.showWelcome = false;
  }

  loadSchools(): void {
    const schools = localStorage.getItem('colegios');
    if (schools) {
      this.colegios = JSON.parse(schools);
    }
    this.showCrud = true;
    this.currentTab = 'colegios'; // Activar la pestaña de colegios
    this.showWelcome = false;
  }

  loadSurveys(): void {
    const surveys = localStorage.getItem('encuestas');
    if (surveys) {
      this.encuestas = JSON.parse(surveys);
    }
    this.showCrud = true;
    this.currentTab = 'encuestas'; // Activar la pestaña de encuestas
    this.showWelcome = false;
  }

  // Funciones CRUD de Encuestas
  saveSurveys(): void {
    localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
  }

  addSurvey(): void {
    if (!this.newSurvey.titulo || !this.newSurvey.descripcion || !this.newSurvey.imagen || !this.newSurvey.preguntas.length) {
      this.errorMessage = 'Por favor, complete todos los campos antes de guardar.';
      return; 
    }

    const newId = this.encuestas.length ? Math.max(...this.encuestas.map(s => s.id)) + 1 : 1;
    const survey = { ...this.newSurvey, id: newId };
    this.encuestas.push(survey);
    this.saveSurveys();
    this.newSurvey = { id: null, titulo: '', descripcion: '', imagen: '', preguntas: [] }; // Limpiar formulario
    this.errorMessage = ''; 
  }

  editSurvey(id: number): void {
    const survey = this.encuestas.find(s => s.id === id);
    if (survey) {
      this.newSurvey = { ...survey };
    }
  }

  saveEditedSurvey(): void {
    const index = this.encuestas.findIndex(s => s.id === this.newSurvey.id);
    if (index !== -1) {
      this.encuestas[index] = { ...this.newSurvey };
      this.saveSurveys();
    }
    this.newSurvey = { id: null, titulo: '', descripcion: '', imagen: '', preguntas: [] }; // Limpiar formulario
    this.errorMessage = '';
  }

  deleteSurvey(id: number): void {
    this.encuestas = this.encuestas.filter(survey => survey.id !== id);
    this.saveSurveys();
  }

  // Funciones CRUD de Usuarios y Colegios (No modificadas)
  saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.usuarios));
  }

  saveSchools(): void {
    localStorage.setItem('colegios', JSON.stringify(this.colegios));
  }

  addUser(): void {
    if (!this.newUser.usuario || !this.newUser.tipoU || !this.newUser.password) {
      this.errorMessage = 'Por favor, complete todos los campos antes de guardar.';
      return; 
    }

    const newId = this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
    const user = { ...this.newUser, id: newId };
    this.usuarios.push(user);
    this.saveUsers();
    this.newUser = { id: null, usuario: '', tipoU: '', password: '' };
    this.errorMessage = ''; 
  }

  addSchool(): void {
    if (!this.newSchool.nombre || !this.newSchool.ciudad || !this.newSchool.codigoDane) {
      this.errorMessage = 'Por favor, complete todos los campos antes de guardar.';
      return; 
    }

    const newId = this.colegios.length ? Math.max(...this.colegios.map(s => s.id)) + 1 : 1;
    const school = { ...this.newSchool, id: newId };
    this.colegios.push(school);
    this.saveSchools();
    this.newSchool = { id: null, nombre: '', ciudad: '', codigoDane: '' };
    this.errorMessage = ''; 
  }

  deleteSchool(id: number): void {
    this.colegios = this.colegios.filter(school => school.id !== id);
    this.saveSchools();
  }

  deleteUser(id: number): void {
    this.usuarios = this.usuarios.filter(user => user.id !== id);
    this.saveUsers();
  }

  editSchool(id: number): void {
    const school = this.colegios.find(s => s.id === id);
    if (school) {
      this.newSchool = { ...school };
    }
  }

  saveEditedSchool(): void {
    const index = this.colegios.findIndex(s => s.id === this.newSchool.id);
    if (index !== -1) {
      this.colegios[index] = { ...this.newSchool };
      this.saveSchools();
    }
    this.newSchool = { id: null, nombre: '', ciudad: '', codigoDane: '' };
    this.errorMessage = '';
  }

  editUser(id: number): void {
    const user = this.usuarios.find(u => u.id === id);
    if (user) {
      this.newUser = { ...user };
    }
  }

  saveEditedUser(): void {
    const index = this.usuarios.findIndex(u => u.id === this.newUser.id);
    if (index !== -1) {
      this.usuarios[index] = { ...this.newUser };
      this.saveUsers();
    }
    this.newUser = { id: null, usuario: '', tipoU: '', password: '' };
    this.errorMessage = '';
  }

  addQuestion(): void {
    this.newSurvey.preguntas.push(''); // Añade una pregunta vacía
  }

  deleteQuestion(index: number): void {
    this.newSurvey.preguntas.splice(index, 1); // Elimina la pregunta por el índice
  }
}
