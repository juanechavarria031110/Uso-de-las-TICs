import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { AuthGuard } from './auth.guard';  
import { UserencuestaComponent } from './userencuesta/userencuesta.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    data: { title: 'Página Principal' },
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    data: { title: 'Iniciar sesión' },
    canActivate: [AuthGuard]  // Bloquea login si el usuario ya está autenticado
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    data: { title: 'Registrar usuario' },
    canActivate: [AuthGuard]  // Bloquea register si el usuario ya está autenticado
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    data: { title: 'Administración' },
    canActivate: [AuthGuard]  // Protege la ruta admin
  },
  { 
    path: 'encuestas', 
    component: EncuestasComponent, 
    data: { title: 'Encuestas' },
    canActivate: [AuthGuard]  // Protege la ruta encuestas
  },

  { 
    path: 'userencuesta', 
    component: UserencuestaComponent, 
    data: { title: 'Encuestas' },
    canActivate: [AuthGuard]  // Protege la ruta userencuesta, asegurando que solo los usuarios autenticados puedan acceder
  },
];
