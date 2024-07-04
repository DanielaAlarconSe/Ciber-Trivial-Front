import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { TriviasComponent } from './components/trivias/trivias.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { CalificacionComponent } from './components/reportes/calificacion/calificacion.component';
import { RespuestasComponent } from './components/reportes/respuestas/respuestas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  //COMPONENTES DEL SISTEMA
  { path: 'inicio', component: InicioComponent },
  { path: 'trivias/:codigo', component: TriviasComponent },
  { path: 'trivia/:codigo', component: TriviaComponent },

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

  { path: 'calificacion', component: CalificacionComponent },
  { path: 'respuestas', component: RespuestasComponent },

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
