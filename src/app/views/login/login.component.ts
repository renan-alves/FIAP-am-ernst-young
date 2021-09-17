import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: ['']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // redirect to home if already logged in
  }

  ngOnInit() {
  }

  invalidCredentialMsg: string;
  username = new FormControl();
  password = new FormControl();
  retUrl: string = "home";
  loginError: string;

  onSubmit() {
    this.authService.SignIn(this.username.value, this.password.value).then(_ => {
      if (this.retUrl != null) {
        this.router.navigate([this.retUrl]);
      } else {
        this.router.navigate(['']);
      }
    }).catch(error => {
      if (error.code === 'auth/wrong-password') {
        this.loginError = "Senha inválida!";
      }
      if (error.code === 'auth/user-not-found') {
        this.loginError = "Usuário não encontrado!";
      }
      if (error.code === 'auth/invalid-email') {
        this.loginError = "Formato do e-mail incorreto!"
      }
    });
  }
}