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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trivial' },

  //COMPONENTES DEL SISTEMA
  { path: 'trivial', component: TrivialComponent },

  { path: 'inicio-sesion', component: LoginComponent },

  { path: 'cuestionario', component: CuestionarioComponent },

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
