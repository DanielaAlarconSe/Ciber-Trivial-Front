import { Curso } from 'src/app/models/curso';
import { CursoService } from './../../services/curso.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.css'],
})
export class TrivialComponent {
  listadoCursos: Curso[] = [];
  constructor(private cursoService: CursoService) {
    this.obtenerCursos();
  }

  card: string[] = [
    'curso',
    'descripcion',
    'ejemplo',
    'curso',
    'descripcion',
    'ejemplo',
  ];

  obtenerCursos() {
    this.cursoService.obtenerCursos().subscribe((data) => {
      console.log(data);
      this.listadoCursos = data;
    });
  }
}
