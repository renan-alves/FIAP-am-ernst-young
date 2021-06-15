import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    ColaboradorComponent,
    LoginComponent,
    LoggedLayoutComponent,
    ListaColaboradoresComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
