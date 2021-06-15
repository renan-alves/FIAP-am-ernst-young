import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(private router: Router, private authService: AuthService) {

    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        console.log(route);
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        } else {
            console.log('watch out mother fucker');
            this.router.navigate(["login"], { queryParams: { retUrl: route.url } });
            return false;
        }
    }
}