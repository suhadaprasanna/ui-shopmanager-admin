import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpEvent,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  public isConnectionError = false;
  public data = {};

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const token: string = localStorage.getItem('token');
    // const token_type: string = localStorage.getItem('token_type');

    //  if (token) {
    //    request = request.clone({ headers: request.headers.set('Authorization', token_type +' '+ token) });
    //  }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    //request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.isConnectionError = true;
          this.data = {
            reason: error && error.error.reason ? error.error.reason : error.message ? error.message : '',
            status: error.status,
            statusText: error.statusText,
            url: error.url
          };
          if (error.error instanceof ErrorEvent) {
            // client-side error
            this.snackBar.open(error.error.message, "Connection Error!", {
              duration: 5000
            });
          } else {
            // server-side error
            let msg = "";
            if(error.status==401){
              msg = "Access Denied !";
            }else if(error.status==400){
              msg = "Username or password is wrong.";
            }else if(error.status==504){
              msg = "Gateway Connection Failed.";
            }else{
              msg = error.error.error;
            }

            // msg += error.error && 
            //       error.error.error_description ? error.error.error_description
            //       : error.error.message ? error.error.message : "";

            this.toastr.error(msg,(error.status+""),{
              timeOut:4000,
              closeButton:true
            });
            // this.snackBar.open(error.status + "", msg, {
            //   duration: 5000
            // });

            if(error.status == 401){
              this.router.navigate(["/login"]);
            }
          }
          console.log(error);
          return throwError(error);
        })
      )
  }

  getData(){
    return this.data;
  }

  reset(){
    this.data = {};
    this.isConnectionError = false;
  }
}
