import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrivialComponent } from './components/trivial/trivial.component';
import { PanelComponent } from './components/panel/panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PersonaComponent } from './components/persona/persona.component';
import { CursoComponent } from './components/curso/curso.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CuestionarioComponent } from './components/cuestionarios/cuestionario/cuestionario.component';

const routes: Routes = [
  //COMPONENTES DEL SISTEMA
  { path: 'trivial', component: TrivialComponent },

  { path: 'cuestionario', component: CuestionarioComponent },

  { path: 'panel', component: PanelComponent },

  { path: 'persona', component: PersonaComponent},

  { path: 'usuario', component: UsuarioComponent},

  { path: 'curso', component: CursoComponent},


  //REDIRECCIONAMIENTO COMOPONENTE POR DEFECTO PARA RUTAS INEXISTENTES EN EL NAVEGADOR
  { path: '', pathMatch: 'full', redirectTo: '/trivial' },
  { path: '**', component: PageNotFoundComponent }, // Usa el componente de página 404
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
export class AppRoutingModule { }
