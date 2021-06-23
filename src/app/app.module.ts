import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './_helpers/auth.guard';
import { ColaboradorComponent } from './views/colaborador/colaborador.component';
import { ListaColaboradoresComponent } from './views/lista-colaboradores/lista-colaboradores.component';
import { LoggedLayoutComponent } from './views/logged-layout/logged-layout.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home/home.component';
import { ColobaradoresSinalizadosComponent } from './views/home/colobaradores-sinalizados/colobaradores-sinalizados.component';
import { MinimalCardComponent } from './views/home/minimal-card/minimal-card.component';
import { SalarioMedioComponent } from './views/home/salario-medio/salario-medio.component';
import { ColaboradoresDeptComponent } from './views/home/colaboradores-dept/colaboradores-dept.component';
import { DistribuicaoColaboradoresComponent } from './views/home/distribuicao-colaboradores/distribuicao-colaboradores.component';
import { BudgetAtualComponent } from './views/home/budget-atual/budget-atual.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropdownComponent } from './views/_shared/select-drop-down/select-drop-down.component';

@NgModule({
  declarations: [
    AppComponent,
    ColaboradorComponent,
    LoginComponent,
    LoggedLayoutComponent,
    ListaColaboradoresComponent,
    HomeComponent,
    ColobaradoresSinalizadosComponent,
    MinimalCardComponent,
    SalarioMedioComponent,
    ColaboradoresDeptComponent,
    DistribuicaoColaboradoresComponent,
    BudgetAtualComponent,
    SelectDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgSelectModule ,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
