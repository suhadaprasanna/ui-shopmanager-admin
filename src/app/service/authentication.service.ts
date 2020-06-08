import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { getHeaders, APILink, AuthCredentials } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  form: FormGroup;
  isProcessing:boolean = false;
  isAuthenticated:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      grant_type: [AuthCredentials.grant_type, [Validators.required]]
    });
  }

  login(){
    this.isProcessing = true;
    if(this.isTokenExisting() && !this.isTokenExpired()){
      this.isProcessing = false;
      this.router.navigate(["/home"]);
    }else {
      if(this.form.valid){
        this.getToken(this.form.value);
      }else{
        this.isProcessing = false;
        this.toastr.warning("Enter valid username and password","Warning");
      }
    }
  }

  logout(){
    this.clearCredentials();
    this.router.navigate(["/login"]);
  }

  getToken(credentials){
    let headers = getHeaders({
      authorization:'basic'
    });
    let formData = new FormData();
    formData = convertJsontoFormData(credentials,null,formData);
    this.httpClient.post(APILink.authAPIURL+APILink.authGetToken,formData,headers).subscribe(
      res=>{
      localStorage.setItem("token",res["access_token"]);
      localStorage.setItem("token_type",res["token_type"]);
      localStorage.setItem("refresh_token",res["refresh_token"]);
      localStorage.setItem("expire_in",new Date().getTime()+(1000* Number(res["expires_in"]))+"");
      localStorage.setItem("scope",res["scope"]);
      this.isAuthenticated = true;
      this.isProcessing = false;
      this.login();
    },
    (err)=>{
      this.isAuthenticated = false;
      this.isProcessing = false;
    });
  }

  checkToken(){
    let headers = getHeaders({
      authorization:'basic'
    });
    let link = APILink.authAPIURL+APILink.authCheckToken+"?token="+this.retriveToken();
    this.httpClient.get(link,headers).subscribe(res=>{
      console.log(res);
    });
  }

  isTokenExpired(){
    let expire_in = localStorage.getItem("expire_in");
    let now = new Date().getTime();
    if(Number(now) > Number(expire_in)){
      this.clearCredentials();
      return true;
    }else{
      return false;
    }
  }

  isTokenExisting(){
    let token = localStorage.getItem("token");
    if(token == null || token == undefined || token == ""){
      return false;
    }else{
      return true;
    }
  }

  retriveAuthToken(){
    let token = localStorage.getItem("token");
    let token_type = localStorage.getItem("token_type");
    return token_type+" "+token;
  }

  retriveToken(){
    let token = localStorage.getItem("token");
    return token;
  }

  clearCredentials(){
    localStorage.removeItem("token");
    localStorage.removeItem("expire_in");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("scope");
  }
}
