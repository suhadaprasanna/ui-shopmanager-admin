import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-item-manage',
  templateUrl: './item-manage.component.html'
})
export class ItemManageComponent implements OnInit {

  icon_faAngleLeft = faAngleLeft;
  icon_faAngleRight = faAngleRight;
  
  constructor(
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
  }

}
