import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(private router:Router, private authService: AuthService ) {
 
    }
 
    canActivateChild(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        if (!this.authService.isUserLoggedIn()) {
            alert('You are not allowed to view this page. You are redirected to login Page');
            
            this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;
 
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        } 
 
        return true;
    }
}