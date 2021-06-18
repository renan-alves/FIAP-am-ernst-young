import { ListaColaboradoresComponent } from './views/lista-colaboradores/lista-colaboradores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorComponent } from './views/colaborador/colaborador.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthService } from './services/auth.service';
import { LoggedLayoutComponent } from './views/logged-layout/logged-layout.component';
import { HomeComponent } from './views/home/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', 
    component: LoggedLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'listaColaboradores', component: ListaColaboradoresComponent },
      { path: 'colaborador', component: ColaboradorComponent },
      { path: '', component: HomeComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
