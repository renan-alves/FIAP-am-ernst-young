import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(private router: Router, private authService: AuthService) {

    }

    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        const currentUser = this.authService.getCurrentUser;
        if (currentUser) {
            return true;
        } else {
            this.router.navigate(["login"], { queryParams: { retUrl: route.url } });
            return false;
        }
    }
}