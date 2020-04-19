import { Component, OnInit } from '@angular/core';
import { faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  icon_faAngleRight = faAngleRight;
  icon_faAngleLeft = faAngleLeft;
  label = {}
  constructor(
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
    this.label = this.commonService.getLabelList();
  }

}
