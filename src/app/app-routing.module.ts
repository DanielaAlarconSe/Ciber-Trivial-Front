import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrivialComponent } from './components/trivial/trivial.component';
import { PanelComponent } from './components/panel/panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PersonaComponent } from './components/persona/persona.component';
import { CursoComponent } from './components/curso/curso.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CuestionarioComponent } from './components/cuestionarios/cuestionario/cuestionario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { VistaPreviaComponent } from './components/cuestionarios/vista-previa/vista-previa.component';
import { PreguntaComponent } from './components/cuestionarios/pregunta/pregunta.component';
import { RespuestaComponent } from './components/cuestionarios/respuesta/respuesta.component';
import { PreguntaRespuestaComponent } from './components/cuestionarios/pregunta-respuesta/pregunta-respuesta.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trivial' },

  //COMPONENTES DEL SISTEMA
  { path: 'inicio', component: InicioComponent },
  { path: 'trivial', component: TrivialComponent },

  { path: 'inicio-sesion', component: LoginComponent },

  { path: 'cuestionario', component: CuestionarioComponent },
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'respuesta', component: RespuestaComponent },
  { path: 'pregunta-respuesta', component: PreguntaRespuestaComponent },
  { path: 'vista-previa', component: VistaPreviaComponent },

  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },

  { path: 'persona', component: PersonaComponent },

  { path: 'usuario', component: UsuarioComponent },

  { path: 'curso', component: CursoComponent },

  { path: 'acceso-denegado', component: PageNotFoundComponent },

  { path: '**', redirectTo: 'acceso-denegado' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
