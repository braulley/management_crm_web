import { AuthService } from './../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.check()) {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
  constructor(private authService: AuthService, private router: Router) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>|Promise<boolean>|boolean {
    if (this.authService.check()) {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
}
