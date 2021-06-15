
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { UserViewModel } from '../_models/UserViewModel';


@Injectable()
export class AuthService {

    private isloggedIn: boolean;
    private userName: string;
    private currentUserSubject: BehaviorSubject<UserViewModel>;
    public currentUser: Observable<UserViewModel>;

    constructor() {
        this.isloggedIn = false;
        this.currentUserSubject = new BehaviorSubject<UserViewModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
        console.log("loguei")
        //Assuming users are provided the correct credentials.
        //In real app you will query the database to verify.
        this.isloggedIn = true;
        this.userName = username;
        this.setLocalUserStorage({ usuario: username, token: "fake-token" } as UserViewModel);
        return of(this.isloggedIn);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public get currentUserValue(): UserViewModel {
        return this.currentUserSubject.value;
    }

    isUserLoggedIn(): boolean {
        return this.isloggedIn;
    }

    isAdminUser(): boolean {
        if (this.userName == 'Admin') {
            return true;
        }
        return false;
    }

    private setLocalUserStorage(user: UserViewModel) {
        // Monta o objeto com os detalhes do usuário e o token jwt

        // Armazena o objeto no local storage do browser para que o usuário se mantenha logado mesmo com refreshes das páginas
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
}
