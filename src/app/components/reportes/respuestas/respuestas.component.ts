import { PreguntaService } from './../../../services/pregunta.service';
import { ResultadosReportesService } from 'src/app/services/resultados-reportes.service';
import { CursoService } from './../../../services/curso.service';
import { Component, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { Curso } from 'src/app/models/curso';
import { RespuestaCuestionario } from 'src/app/models/respuesta-cuestionario';
import { Calificacion } from 'src/app/models/calificacion';
import { Pregunta } from 'src/app/models/pregunta';
import { ReporteAgrupadoDto } from 'src/app/dto/reporte-agrupado-dto';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
  ],
})
export class RespuestasComponent {
  listadoCalificaciones: Calificacion[] = [];
  listadoCursos: Curso[] = [];
  listadoCuestionarios: Cuestionario[] = [];
  listadoPreguntas: Pregunta[] = [];
  listadoReporteAgrupado: ReporteAgrupadoDto[] = [];
  codigosPreguntas: number[] = [];

  dataSource = new MatTableDataSource<Calificacion>([]);
  displayedColumns: string[] = [
    'index',
    'nombre',
    'curso',
    'cuestionario',
    'calificacion',
    'fecha',
  ];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  dialogRef!: MatDialogRef<any>;
  palabrasClaves!: string;
  cursoCodigo!: number;
  cuestionarioCodigo!: number;

  constructor(
    public cuestionarioService: CuestionarioService,
    public resultadosReportesService: ResultadosReportesService,
    public cursoService: CursoService,
    public preguntaService: PreguntaService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.validacionToken()) {
      this.obtenerCursos();
    }
  }

  obtenerCalificaciones() {
    this.resultadosReportesService
      .obtenerCalificaciones()
      .subscribe((data: any) => {
        console.log(data);
        this.listadoCalificaciones = data;
        this.dataSource = new MatTableDataSource<Calificacion>(data);
        this.paginator.firstPage();
        this.dataSource.paginator = this.paginator;
      });
  }

  obtenerCursos() {
    this.cursoService.obtenerCursos().subscribe((data) => {
      this.listadoCursos = data;
    });
  }

  obtenerCuestionarios(codigo: number) {
    this.cuestionarioService
      .obtenerCuestionariosCurso(codigo)
      .subscribe((data) => {
        this.listadoCuestionarios = data;
      });
  }

  obtenerPreguntas(cuestionarioCodigo: number) {
    this.preguntaService
      .obtenerPreguntasCuestionario(cuestionarioCodigo)
      .subscribe((data) => {
        this.listadoPreguntas = data;
        this.codigosPreguntas = this.listadoPreguntas.map(
          (pregunta) => pregunta.codigo
        );
        this.generarReporteAgrupadoOpciones();
      });
  }

  generarReporteAgrupadoOpciones() {
    this.resultadosReportesService
      .generarDatosReporteAgrupado(
        this.cuestionarioCodigo,
        this.codigosPreguntas
      )
      .subscribe((data) => {
        this.listadoReporteAgrupado = data;
      });
  }

  getColumnas(): string[] {
    const allColumns: string[] = [];
    this.listadoReporteAgrupado.forEach((data) => {
      const columns = Object.keys(data.columnas);
      columns.forEach((column) => {
        if (!allColumns.includes(column)) {
          allColumns.push(column);
        }
      });
    });
    allColumns.sort();
    return allColumns;
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  restaurar() {
    this.obtenerCalificaciones();
    this.palabrasClaves = '';
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

  fError(er: any): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');
    if (arr[0] == 'Access token expired') {
      this.authService.logout();
      this.router.navigate(['login']);
    } else {
      this.mensajeError();
    }
  }
}
