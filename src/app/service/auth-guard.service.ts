import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router:Router,
    private snackBar: MatSnackBar,
    private authService:AuthenticationService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let token = localStorage.getItem("token");

    if( !this.authService.isTokenExisting() || this.authService.isTokenExpired()){
      if(this.authService.isTokenExpired()){
        this.snackBar.open("Please login","Credentials expired",{
          duration: 5000
        });
      }
      this.router.navigate(["/login"]);
      return false;
    }else {
      return true;
    }

  }
}
