import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/model/object/Object';
import { Status } from 'src/app/util/Util';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Location } from '@angular/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html'
})
export class PersonViewComponent implements OnInit {

  icon_faArrowLeft= faArrowLeft;

  isLoading = false;
  selectedId;
  person:Person;

  constructor(
    private personService:PersonServiceService,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private commonService:CommonServiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.queryParamMap.subscribe((params:ParamMap)=>{
      if(params.get("person_id")!=undefined||params.get("person_id")!=""){
        this.selectedId = params.get("person_id"); 
      }
    });
    
    if(this.selectedId != undefined && this.selectedId != null && this.selectedId !=""){
      this.personService.getById(this.selectedId).subscribe((res)=>{
        if(res!=undefined&&res !=null){
          if(res["status"]==Status.success){
            this.person = res["outputs"]["person"];
          }else{
            this.toastr.error("Something went wrong. Not found person details")
          }
        }
      });
    }
    this.isLoading = false;
  }

  goBack(){
    this.location.back();
  }

}
