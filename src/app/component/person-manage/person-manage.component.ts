import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-person-manage',
  templateUrl: './person-manage.component.html',
})
export class PersonManageComponent implements OnInit {

  icon_faAngleLeft = faAngleLeft;

  constructor(
    private toastr:ToastrService,
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
    
  }

}
