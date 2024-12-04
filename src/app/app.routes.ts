import { Routes } from '@angular/router'; 
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component'; 
import { HomeComponent } from './home/home.component'; 
import { EncuestasComponent } from './encuestas/encuestas.component'; 
import { AdminComponent } from './admin/admin.component'; // Asegúrate de haber importado este componente correctamente


export const routes: Routes = [ 
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a Home como ruta inicial 
  { path: 'home', component: HomeComponent }, // Ruta para el componente de Home 
  { path: 'login', component: LoginComponent }, // Ruta para el componente de login 
  { path: 'register', component: RegisterComponent }, // Ruta para el componente de registro
  { path: 'encuestas', component: EncuestasComponent }, // Ruta para EncuestasComponent
  { path: 'admin', component: AdminComponent }, // Ruta para el componente de administración
];
