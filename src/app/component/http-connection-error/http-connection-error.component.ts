import { Component, OnInit } from '@angular/core';
import { HttpInterceptorService } from 'src/app/service/http-interceptor.service';

@Component({
  selector: 'app-http-connection-error',
  templateUrl: './http-connection-error.component.html'
})
export class HttpConnectionErrorComponent implements OnInit {

  constructor(private httpErrorService:HttpInterceptorService) { }

  ngOnInit() {
  }

}
