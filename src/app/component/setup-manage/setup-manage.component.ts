import { Component, OnInit } from '@angular/core';
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-setup-manage',
  templateUrl: './setup-manage.component.html'
})
export class SetupManageComponent implements OnInit {

  icon_faAngleLeft = faAngleLeft;
  icon_faAngleRight = faAngleRight;

  constructor(
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
    
  }

}
