import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    // Se a página de login foi acessada, força o logout
    this.authService.logout();
  }

  invalidCredentialMsg: string;
  username: string;
  password: string;
  retUrl: string = "home";

  onSubmit() {
    this.authService.login("teste", "senha teste").subscribe(data => {
      if (this.retUrl != null) {
        this.router.navigate([this.retUrl]);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}