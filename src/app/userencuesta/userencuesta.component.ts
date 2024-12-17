import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-userencuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './userencuesta.component.html',
  styleUrls: ['./userencuesta.component.scss']
})
export class UserencuestaComponent {
  seccionActiva: string = 'lista'; // Inicializamos la sección activa con 'lista'
  encuestas: any[] = [];  // Encuestas cargadas desde localStorage
  encuestaSeleccionada: any | null = null; // Encuesta seleccionada para ver detalles

  constructor(private route: ActivatedRoute, private router: Router) {}

  // Método para cambiar de sección
  mostrarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  // Cargar encuestas al iniciar
  ngOnInit() {
    // Cargar encuestas desde localStorage
    if (typeof localStorage !== 'undefined') {
      const storedEncuestas = localStorage.getItem('encuestas');
      if (storedEncuestas) {
        this.encuestas = JSON.parse(storedEncuestas);
        console.log(this.encuestas); // Verifica que las encuestas estén correctamente cargadas
      }
    }

    // Obtener el enlaceId desde la URL
    this.route.paramMap.subscribe(params => {
      const enlaceId = params.get('enlaceId');
      if (enlaceId) {
        this.cargarEncuestaPorLink(enlaceId);
      }
    });
  }

  // Función para cargar la encuesta usando el enlaceId
  cargarEncuestaPorLink(enlaceId: string) {
    const enlace = JSON.parse(localStorage.getItem(`enlace_${enlaceId}`) || '{}');
    
    // Verificar si el enlace existe y no ha expirado
    if (enlace && enlace.expirationTime > new Date().getTime()) {
      const encuesta = this.encuestas.find(e => e.id === enlace.encuestaId);
      if (encuesta) {
        this.encuestaSeleccionada = encuesta;
        this.seccionActiva = 'detalles';
      } else {
        alert('Encuesta no encontrada');
      }
    } else {
      alert('El enlace ha expirado o no es válido.');
    }
  }

  // Seleccionar encuesta para ver
  verEncuesta(index: number) {
    this.encuestaSeleccionada = this.encuestas[index];
    console.log(this.encuestaSeleccionada); // Verifica que la encuesta seleccionada se haya cargado correctamente
    this.seccionActiva = 'detalles'; // Cambia a la sección de detalles
  }

  // Volver a la lista de encuestas
  volverALaLista() {
    this.encuestaSeleccionada = null;
    this.seccionActiva = 'lista';
  }

  // Generar el link temporal y redirigir
  generarLink(index: number) {
    const encuesta = this.encuestas[index];
    const enlaceId = this.normalizarTexto(encuesta.titulo); // Normalizamos el título de la encuesta
    const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000; // Expiración en 12 horas
  
    const enlace = {
      id: enlaceId,
      encuestaId: encuesta.id,
      expirationTime: expirationTime
    };
  
    // Guardar el enlace en localStorage
    localStorage.setItem(`enlace_${enlaceId}`, JSON.stringify(enlace));
  
    // Generar el mensaje con la ruta correcta
    const mensaje = `/verencuesta/${enlaceId}`;
  
    // Mostrar el mensaje con el enlace generado
    alert(`Link generado: ${mensaje}`);
  
    // Redirigir al componente "Ver Encuesta"
    this.router.navigate(['/verencuesta', enlaceId]); // Redirige a la URL con el enlaceId
  }
  

  // Función para normalizar el texto del título
  private normalizarTexto(titulo: string) {
    return titulo
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres no permitidos por "-"
      .replace(/^-+|-+$/g, '');   // Eliminar "-" al inicio o al final
  }
}
