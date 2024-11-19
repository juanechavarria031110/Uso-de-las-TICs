import { Component } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule 
 
@Component({ 
  selector: 'app-login', 
  standalone: true, // Esto indica que es un componente standalone 
  imports: [FormsModule, RouterLink], // Agrega FormsModule aquí para habilitar ngModel 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.scss'] // Cambié styleUrl a styleUrls 
}) 
export class LoginComponent { 
   
   
}