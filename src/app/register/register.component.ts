import { Component } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule 
 
@Component({ 
  selector: 'app-register', 
  standalone: true, // Esto indica que es un componente standalone 
  imports: [FormsModule, RouterLink], // Agrega FormsModule aquí para habilitar ngModel 
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.scss'] // Cambié styleUrl a styleUrls 
}) 
export class RegisterComponent { 
  
}