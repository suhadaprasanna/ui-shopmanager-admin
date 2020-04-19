import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { ToastrService } from 'ngx-toastr';
import { Person } from 'src/app/model/object/Object';
import { Status } from 'src/app/util/Util';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
})
export class PersonListComponent implements OnInit {

  userList: Person[];

  constructor(
    private personService: PersonServiceService,
    private userService: UserServiceService,
    private toastr: ToastrService,
    private commonService: CommonServiceService
  ) { }

  ngOnInit() {
    this.getPersonList();
  }

  getPersonList() {
    this.userService.getAllUsers({"with_person_details":true}).subscribe(res => {
      console.log(res)
        if (res["status"] == Status.success) {
          this.userList = res["outputs"]["user_list"];
        } else {
          this.toastr.error("Something went wrong", "");
        }
      });
  }

}
