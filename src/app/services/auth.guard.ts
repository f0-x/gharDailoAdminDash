import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /*     return true; */
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          /*             if(!user.emailVerified) //Make sure their email is verified
                        this.router.navigate(['/verify-email']); */
          resolve(true);
        } else {
          console.log('Auth Guard: User is not Logged In');
          this.router.navigate(['/home']); // If the user is logged out send to home
          resolve(false);
        }
      });
    });
  }


}
