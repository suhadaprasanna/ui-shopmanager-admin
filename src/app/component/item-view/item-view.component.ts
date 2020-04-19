import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ItemServiceService } from 'src/app/service/item-service.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html'
})
export class ItemViewComponent implements OnInit {

  constructor(
    private commonService:CommonServiceService,
    private itemService:ItemServiceService
  ) { }

  ngOnInit() {
  }

}
