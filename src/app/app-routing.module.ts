import { ListaColaboradoresComponent } from './views/lista-colaboradores/lista-colaboradores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorComponent } from './views/colaborador/colaborador.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/home/home.module')
      .then(m => m.HomeModule)

  },
  { path: 'listaColaboradores', component: ListaColaboradoresComponent },
  { path: 'colaborador', component: ColaboradorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
