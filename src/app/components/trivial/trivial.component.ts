import { Component, OnInit } from '@angular/core';
import { Cuestionario } from 'src/app/models/cuestionario';
import { AuthService } from 'src/app/services/auth.service';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.css'],
})
export class TrivialComponent implements OnInit {
  cuestionarios!: Cuestionario[];
  precarga: boolean = false;
  encuesta: number = 0;

  constructor(
    private authService: AuthService,
    public cuestionarioService: CuestionarioService
  ) {
    if (this.authService.validacionToken()) {
    }
  }

  ngOnInit() {
    this.listarCuestionario();
  }

  realizarEncuesta(codigo: number) {
    //this.cuestionarioService.obtenerEncuesta(codigo);
  }

  listarCuestionario() {
    this.cuestionarioService.obtenerCuestionarios().subscribe((data) => {
      this.precarga = true;
      this.cuestionarios = data;
      console.log(data);
    });
  }
}
