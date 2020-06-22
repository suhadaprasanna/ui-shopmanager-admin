import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './service/common-service.service';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  
  title = 'ui-shopmanager-admin';

  constructor(
    private commonService:CommonServiceService,
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
    this.commonService.loadLabelPack();
  }
}
