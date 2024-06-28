import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Cuestionario } from 'src/app/models/cuestionario';

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.css'],
})
export class VistaPreviaComponent implements OnInit {
  formulario!: FormGroup;
  listadoCuestionarios: Cuestionario[] = [];
  cuestionario!: any;
  flag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cuestionarioService: CuestionarioService
  ) {
    this.crearFormulario();
    this.obtenerCuestionarios();
  }

  ngOnInit() {}

  private crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      codigo: new FormControl('', Validators.required),
    });
  }

  obtenerCuestionarios(): void {
    this.cuestionarioService.obtenerCuestionarios().subscribe((data) => {
      this.listadoCuestionarios = data;
    });
  }

  visualizar() {
    this.flag = true;
    this.cuestionario = this.listadoCuestionarios.find(
      (objeto) => objeto.codigo === this.formulario.get('codigo')!.value
    );
  }
}
