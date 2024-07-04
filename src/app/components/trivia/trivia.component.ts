import { Component, OnInit } from '@angular/core';
import {
  FormArray,
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
import { Respuesta } from 'src/app/models/respuesta';
import { RespuestaCuestionario } from 'src/app/models/respuesta-cuestionario';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css'],
})
export class TriviaComponent implements OnInit {
  formularioEstudiante!: FormGroup;
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
    this.crearFormularioEstudiante();
    this.obtenerCuestionario();
  }

  ngOnInit() {}

  private crearFormularioEstudiante(): void {
    this.formularioEstudiante = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
    });
  }

  generarEstudiante(): void {
    let respuestaCuestionario: RespuestaCuestionario =
      new RespuestaCuestionario();
    respuestaCuestionario.estudianteNombre =
      this.formularioEstudiante.get('nombre')!.value;
    respuestaCuestionario.cuestionarioCodigo = this.cuestionarioCodigo;

    this.registrarEstudiante(respuestaCuestionario);
  }

  registrarEstudiante(respuestaCuestionario: RespuestaCuestionario) {
    this.respuestaService
      .registrarRespuestaCuestionario(respuestaCuestionario)
      .subscribe(
        (data) => {
          if (data > 0) {
            console.log('Estudiante registrado!');
            this.cargarRespuestas();
          } else {
            this.mensajeError();
          }
        },
        (err) => this.fError(err)
      );
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
        this.crearFormularioCuestionario();
      });
  }

  crearFormularioCuestionario() {
    this.formulario = this.formBuilder.group({});
    for (const pregunta of this.listadoPreguntas) {
      this.formulario.addControl(
        `respuesta${pregunta.codigo}`,
        new FormControl('', Validators.required)
      );
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
          this.router.navigate(['/trivias', this.cuestionario.cursoCodigo]);
        }
      });
  }

  transformToUppercase(event: Event, controlName: string): void {
    const inputElement = event.target as HTMLInputElement;
    const uppercaseValue = inputElement.value.toUpperCase();
    inputElement.value = uppercaseValue;
    //this.form.get(controlName)?.setValue(uppercaseValue);
  }

  cargarRespuestas() {
    this.respuestaService.obtenerUltimoRegistro().subscribe((data) => {
      if (this.formulario.valid) {
        // Recoge las respuestas
        const respuestas: Respuesta[] = [];
        for (const pregunta of this.listadoPreguntas) {
          const respuesta = new Respuesta();
          respuesta.preguntaCodigo = pregunta.codigo;
          respuesta.preguntaRespuestaCodigo = this.formulario.get(
            `respuesta${pregunta.codigo}`
          )?.value;
          let respuestaTriva: Respuesta = new Respuesta();
          respuestaTriva.respuestaCuestionarioCodigo = data;
          respuestaTriva.preguntaCodigo = respuesta.preguntaCodigo;
          respuestaTriva.preguntaRespuestaCodigo =
            respuesta.preguntaRespuestaCodigo;
          this.registrarTriva(respuestaTriva);
        }

        // Aquí puedes enviar las respuestas al backend
        console.log('Respuestas enviadas:', respuestas);

        Swal.fire('¡Éxito!', 'Respuestas enviadas correctamente', 'success');
      } else {
        Swal.fire('Error', 'Por favor, complete todas las preguntas', 'error');
      }
    });
  }

  registrarTriva(respuesta: Respuesta) {
    this.respuestaService.registrarRespuestaTrivia(respuesta).subscribe(
      (data) => {
        if (data <= 0) {
          this.mensajeError();
        }
      },
      (err) => this.fError(err)
    );
  }

  mensajeError() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo completar el proceso.',
      showConfirmButton: true,
      confirmButtonText: 'Listo',
      confirmButtonColor: '#8f141b',
    });
  }

  mensajeSuccses() {
    Swal.fire({
      icon: 'success',
      title: 'Proceso realizado',
      text: '¡Operación exitosa!',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');
    if (arr[0] == 'Access token expired') {
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }
}
