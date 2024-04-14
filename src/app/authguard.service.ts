import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private loginService:LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const allowedRoles = next.data['roles'] as Array<string>;
    if (this.loginService.isLoggedIn() && allowedRoles.includes(this.loginService.getUserRole())) {
      return true; 
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
