import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuestas',
  standalone: true,
  imports: [FormsModule, CommonModule], // Asegura que CommonModule esté aquí
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  imagen: string = '';
  imagenPreview: string = '';
  preguntas: { tipo: string; texto: string; opciones: string[] }[] = [];
  encuestas: { titulo: string; descripcion: string; imagen: string; preguntas: { tipo: string; texto: string; opciones: string[] }[] }[] = [];
  editarIndex: number | null = null;

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const storedEncuestas = localStorage.getItem('encuestas');
      if (storedEncuestas) {
        this.encuestas = JSON.parse(storedEncuestas);
      }
    }
  }

  guardarTitulo() {
    if (!this.titulo) {
      alert('Por favor, ingresa un título');
      return;
    }

    const nuevaEncuesta = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      imagen: this.imagen || 'assets/IMG/placeholder.png',
      preguntas: this.preguntas
    };

    if (this.editarIndex !== null) {
      this.encuestas[this.editarIndex] = nuevaEncuesta;
      this.editarIndex = null;
    } else {
      this.encuestas.push(nuevaEncuesta);
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
    }

    this.resetFormulario();
    this.mostrarSeccion('lista');
  }

  editarEncuesta(index: number) {
    const encuesta = this.encuestas[index];
    this.titulo = encuesta.titulo;
    this.descripcion = encuesta.descripcion;
    this.imagen = encuesta.imagen;
    this.imagenPreview = encuesta.imagen;
    this.preguntas = JSON.parse(JSON.stringify(encuesta.preguntas));
    this.editarIndex = index;
    this.mostrarSeccion('crear');
  }

  eliminarEncuesta(index: number) {
    this.encuestas.splice(index, 1);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
    }
  }

  cargarImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
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
    this.preguntas.push({ tipo: 'seleccion', texto: '', opciones: [] });
  }

  eliminarPregunta(index: number) {
    this.preguntas.splice(index, 1);
  }

  agregarOpcion(index: number) {
    this.preguntas[index].opciones.push('');
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    this.preguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
  }

  mostrarSeccion(seccion: string) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach((seccion: any) => {
      seccion.style.display = 'none';
    });

    const seccionActiva = document.getElementById(seccion);
    if (seccionActiva) {
      seccionActiva.style.display = 'block';
    }
  }

  resetFormulario() {
    this.titulo = '';
    this.descripcion = '';
    this.imagen = '';
    this.imagenPreview = '';
    this.preguntas = [];
    this.editarIndex = null;
  }
}
