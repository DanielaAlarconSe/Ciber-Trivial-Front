import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaOpcion } from 'src/app/models/respuesta-opcion';
import { PreguntaRespuesta } from 'src/app/models/pregunta-respuesta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { PreguntaRespuestaService } from 'src/app/services/pregunta-respuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
})
export class TriviaComponent implements OnInit {
  formulario!: FormGroup;
  cuestionario!: Cuestionario;
  listadoPreguntas: Pregunta[] = [];
  listadoOpciones: RespuestaOpcion[] = [];
  listadoPreguntaRespuestas: Array<PreguntaRespuesta[]> = new Array();
  listadoRespuestas: Array<PreguntaRespuesta[]> = new Array();
  flag: boolean = false;
  cuestionarioCodigo!: number;

  constructor(
    private formBuilder: FormBuilder,
    public cuestionarioService: CuestionarioService,
    public preguntaService: PreguntaService,
    public respuestaService: RespuestaService,
    public preguntaRespuestaService: PreguntaRespuestaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.cuestionarioCodigo = params['codigo'];
      console.log(this.cuestionarioCodigo);
    });
    this.crearFormulario();
    this.obtenerCuestionario();
  }

  ngOnInit() {}

  private crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      codigo: new FormControl('', Validators.required),
    });
  }

  obtenerCuestionario(): void {
    this.cuestionarioService
      .obtenerCuestionario(this.cuestionarioCodigo)
      .subscribe((data) => {
        if (JSON.stringify(data) != '[]') {
          this.cuestionario = data[0];
        }
      });
    this.listarPreguntasCuestionario();
  }

  listarPreguntasCuestionario() {
    this.preguntaService
      .obtenerPreguntasCuestionario(this.cuestionarioCodigo)
      .subscribe((data) => {
        this.listadoPreguntas = data;
        for (const pregunta of data) {
          this.preguntaRespuestaService
            .obtenerPreguntaRespuestas(pregunta.codigo)
            .subscribe((data) => {
              this.listadoPreguntaRespuestas.push(data);
              this.listadoPreguntaRespuestas[pregunta.codigo] = data;
            });
        }
        this.funcion();
      });
  }

  funcion() {
    for (let index = 0; index < this.listadoPreguntas.length; index++) {
      this.preguntaRespuestaService
        .obtenerPreguntaRespuestas(this.listadoPreguntas[index].codigo)
        .subscribe((data) => {
          this.listadoRespuestas.push(data);

          this.listadoRespuestas[index] = data;
        });
    }
  }
  salir() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-3',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¡Advertencia!',
        text: 'Está a punto de salir de la trivia, si decides proceder sin guardar estos cambios, se perderán permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Permanecer',
        cancelButtonText: 'Regresar',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Termina tu proceso',
            'Desarrolla a cabalidad la encuesta.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Trivias',
            'Los cambios no se han guardado.',
            'warning'
          );
          this.router.navigate(['/trivias',this.cuestionario.cursoCodigo]);
        }
      });
  }
}
