import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthenticationService,
    private router:Router
    ) { }

  ngOnInit() {
    this.checkLogin();
    this.authService.buildForm();
  }

  login(){
    this.authService.login();
  }

  checkLogin(){
    let token = localStorage.getItem("token");
    if(token != null && token != undefined && token != ""){
      this.router.navigate(["/home"]);
    }
  }
}
