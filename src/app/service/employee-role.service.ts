import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { EmployeeRole } from '../model/object/Object';
import { APILink } from '../util/APIManage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRoleService {

  form:FormGroup;
  employeeRole:EmployeeRole;

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private httpClient:HttpClient
  ) { }

  buildForm(){
    if(this.employeeRole==undefined||this.employeeRole==null){
      this.employeeRole = new EmployeeRole();
    }
    this.form = this.formBuilder.group({
      id:[this.employeeRole.id],
      role_code:[this.employeeRole.role_code,[Validators.required]],
      role_name:[this.employeeRole.role_name,[Validators.required]],
      status:[this.employeeRole.status]
    });
  }

  submit(){
    if(this.form.valid){
      return this.httpClient.post(APILink.shopAPIURL+"/emprole/add",this.form.value);
    }else{
      return null;
    }
  }

  getRoles(){
    return this.httpClient.post(APILink.shopAPIURL+"/emprole/get",{});
  }
}
