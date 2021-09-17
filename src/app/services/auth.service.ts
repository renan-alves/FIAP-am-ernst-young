import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: firebase.User;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email: string, senha: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, senha);
  }

  SignInAnonymous(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInAnonymously()
  }

  SignUp(email: string, senha: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, senha);
  }

  ForgotPassword(form: { email: string }): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(form.email);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false
  }

  get getCurrentUser(): firebase.User {
    return JSON.parse(localStorage.getItem('user'));
  }

  async SignOut(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
  }
}