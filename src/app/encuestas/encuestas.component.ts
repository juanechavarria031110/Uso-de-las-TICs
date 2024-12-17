import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuestas',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Incluimos FormsModule aquí
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  seccionActiva: string = 'lista';  
  titulo: string = '';
  descripcion: string = '';
  imagen: string = '';
  imagenPreview: string = '';
  preguntas: { id: number; tipo: string; texto: string; opciones: string[] }[] = [];
  encuestas: { titulo: string; descripcion: string; imagen: string; preguntas: { id: number; tipo: string; texto: string; opciones: string[] }[] }[] = [];
  editarIndex: number | null = null;
  preguntaIdCounter: number = 1;  // Identificador unico para las preguntas 

  constructor() {}

  ngOnInit() {
    this.cargarEncuestasDesdeLocalStorage();
  }

  cargarEncuestasDesdeLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const storedEncuestas = localStorage.getItem('encuestas');
      if (storedEncuestas) {
        this.encuestas = JSON.parse(storedEncuestas);
      }
    }
  }

  guardarTitulo() {
    if (!this.validarTituloYPreguntas()) return;

    const nuevaEncuesta = this.crearEncuesta();

    if (this.editarIndex !== null) {
      this.encuestas[this.editarIndex] = nuevaEncuesta;
      this.editarIndex = null;
    } else {
      this.encuestas.push(nuevaEncuesta);
    }

    this.guardarEncuestasEnLocalStorage();
    console.log('Encuesta guardada exitosamente:', nuevaEncuesta);

    this.resetFormulario();
    this.mostrarSeccion('lista');
  }

  validarTituloYPreguntas(): boolean {
    if (!this.titulo.trim()) {
      alert('Por favor, ingresa un título');
      return false;
    }

    if (!this.preguntas.length) {
      alert('Por favor, agrega al menos una pregunta');
      return false;
    }

    return true;
  }

  crearEncuesta() {
    return {
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      imagen: this.imagen || 'assets/IMG/placeholder.png',
      preguntas: this.preguntas.map(p => ({
        id: p.id,
        tipo: p.tipo,
        texto: p.texto.trim(),
        opciones: p.opciones.map(o => o.trim())
      }))
    };
  }

  guardarEncuestasEnLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
    }
  }

  editarEncuesta(index: number) {
    const encuesta = this.encuestas[index];
    this.titulo = encuesta.titulo;
    this.descripcion = encuesta.descripcion;
    this.imagen = encuesta.imagen;
    this.imagenPreview = encuesta.imagen;
    this.preguntas = encuesta.preguntas.map(p => ({ ...p }));
    this.editarIndex = index;
    this.mostrarSeccion('crear');
  }

  eliminarEncuesta(index: number) {
    this.encuestas.splice(index, 1);
    this.guardarEncuestasEnLocalStorage();
  }

  cargarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagen = reader.result as string;
        this.imagenPreview = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  agregarPregunta() {
    this.preguntas.push({
      id: this.preguntaIdCounter++,
      tipo: 'seleccion',
      texto: '',
      opciones: []
    });
    console.log('Pregunta agregada:', this.preguntas);
  }

  eliminarPregunta(index: number) {
    this.preguntas.splice(index, 1);
  }

  agregarOpcion(index: number) {
    this.preguntas[index].opciones.push('');
    console.log(`Opción agregada a la pregunta ${index}:`, this.preguntas[index]);
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    this.preguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
    console.log(`Opción eliminada de la pregunta ${preguntaIndex}:`, this.preguntas[preguntaIndex]);
  }

  mostrarSeccion(seccion: string) {
    this.seccionActiva = seccion;
  }

  resetFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.imagen = '';
    this.imagenPreview = '';
    this.preguntas = [];
    this.editarIndex = null;
    this.preguntaIdCounter = 1;
  }

  trackByPreguntaId(index: number, pregunta: any) {
    return pregunta.id;  // Usamos el id como referencia única
  }

  trackByOpcionId(index: number, opcion: any) {
    return index;  // El índice también puede usarse como clave única para las opciones
  }
}
