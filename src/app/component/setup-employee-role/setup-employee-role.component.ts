import { Component, OnInit } from '@angular/core';
import { EmployeeRoleService } from 'src/app/service/employee-role.service';
import { EmployeeRole } from 'src/app/model/object/Object';
import { Status, TransferData } from 'src/app/util/Util';
import { ToastrService } from 'ngx-toastr';
import { ResponseReader } from 'src/app/service/ResponseReader';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-setup-employee-role',
  templateUrl: './setup-employee-role.component.html'
})
export class SetupEmployeeRoleComponent implements OnInit {

  employeeRoles: EmployeeRole[];
  resReader = new ResponseReader(this.toastr);

  constructor(
    private employeeRoleService: EmployeeRoleService,
    private toastr:ToastrService,
    private commonService:CommonServiceService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.employeeRoleService.buildForm();
  }

  add() {
    this.employeeRoleService.submit().subscribe((res:TransferData)=>{
      console.log(res);
      if(res != undefined && res != null){
        if(res.status == Status.success){
          this.toastr.success("Saved successfully","Success");
          this.getRoles();
        }else{
          this.resReader.defaultRead(res);
        }
      }else{
        this.toastr.error("Cannot read response","Response read error !");
      }
    });
  }

  getRoles() {
    this.employeeRoleService.getRoles().subscribe(
      (res:TransferData) => {
        console.log(res)
        if (res != undefined && res != null) {
          if (res.status == Status.success) {
            this.employeeRoles = res.outputs["employee_role_list"];
          }
        }
      },
      error => {

      });
  }
}
