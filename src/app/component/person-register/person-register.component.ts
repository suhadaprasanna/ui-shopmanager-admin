import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { Person } from 'src/app/model/object/Object';
import { Status, TransferData } from 'src/app/util/Util';
import { ToastrService } from 'ngx-toastr';
import { faMinusCircle,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ResponseReader } from 'src/app/service/ResponseReader';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
})
export class PersonRegisterComponent implements OnInit {

  icon_faMinusCircle = faMinusCircle;
  icon_faPlusCircle= faPlusCircle;
  selectedId;
  person:Person;
  resReader = new ResponseReader(this.toastr);

  constructor(
    private personService:PersonServiceService,
    private router:Router,
    private route:ActivatedRoute,
    private toastr:ToastrService,
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
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
            this.personService.setPerson(this.person);
            this.personService.buildForm();
          }else{
            this.toastr.error("Something went wrong. Not found person details")
          }
        }
      });
    }else{
      this.person = null;
      this.personService.setPerson(this.person);
    }
    this.personService.buildForm();
  }

  register(){
    if(this.personService.form.valid){
      this.personService.submit().subscribe((res:TransferData)=>{
        if(res.getStatus() == Status.success){
          this.toastr.success("Register successfully","Success");
        }else{
          this.resReader.defaultRead(res);
        }
      });
    }else{
      this.toastr.warning("Form not valid","Warning");
    }
  }
  update(){
    if(this.personService.form.valid){
      this.personService.update().subscribe((res:TransferData)=>{
        if(res["status"] == Status.success){
          this.toastr.success("Update successfully","Success");
        }else{
          this.resReader.defaultRead(res);
        }
      });
    }else{
      this.toastr.warning("Form not valid","Warning");
    }
  }
  reset(){
    this.personService.reset();
    this.personService.buildForm();
  }

  getByNIC(nic){
    this.personService.getByNIC(nic).subscribe(res=>{
      console.log(res);
    });
  }
}
