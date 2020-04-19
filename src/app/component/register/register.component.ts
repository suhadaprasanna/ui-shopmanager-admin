import { Component, OnInit } from '@angular/core';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  icon_faAngleLeft = faAngleLeft;
  
  constructor(
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
    
  }

}
