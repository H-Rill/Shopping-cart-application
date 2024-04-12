import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const hasValue = localStorage.getItem('password') !== null;

    if (hasValue) {
      return true;
    } else {
      
      this.router.navigate(['login']);
      return false;
    }
  }
}
