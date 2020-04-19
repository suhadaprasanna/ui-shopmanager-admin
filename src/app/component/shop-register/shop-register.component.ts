import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/service/shop-service.service';
import { MAT_DATE_LOCALE, MatDialog } from '@angular/material';
import { Person, User, Shop } from 'src/app/model/object/Object';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { Status, Key, TransferData } from 'src/app/util/Util';
import { UserServiceService } from 'src/app/service/user-service.service';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { DialogComponent } from '../plugin/dialog/dialog.component';
import { ResponseReader } from 'src/app/service/ResponseReader';

@Component({
  selector: 'app-shop-register',
  templateUrl: './shop-register.component.html',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en' },
  ]
})
export class ShopRegisterComponent implements OnInit {

  icon_faMinusCircle = faMinusCircle;
  icon_faPlusCircle = faPlusCircle;
  person: Person;
  shop: Shop;
  user: User;
  personList: Person[];
  selectedShopId;
  selectedPersonId;

  constructor(
    private shopService: ShopServiceService,
    private personService: PersonServiceService,
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commonService:CommonServiceService,
    public dialog: MatDialog,
    private resReader:ResponseReader
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.get("shop_id") != undefined || params.get("shop_id") != "") {
        this.selectedShopId = params.get("shop_id");
      }
      if (params.get("person_id") != undefined || params.get("person_id") != "") {
        this.selectedPersonId = params.get("person_id");
      }
    });
    console.log(this.selectedPersonId+" "+this.selectedShopId)
    if (this.selectedShopId != undefined && this.selectedShopId != null && this.selectedShopId != "") {
      this.shopService.getById(this.selectedShopId).subscribe((res) => {
        console.log(res)
        if (res != undefined && res != null) {
          if (res["status"] == Status.success) {
            this.shop = res["outputs"]["shop"];
            this.shopService.setShop(this.shop);
            this.shopService.buildForm();
          } else {
            this.toastr.error("Something went wrong. Not found shop details")
          }
        }
      });
    } else {
      this.shop = null;
      this.shopService.setShop(this.shop);
    }

    if (this.selectedPersonId != undefined && this.selectedPersonId != null && this.selectedPersonId != "") {
      this.personService.getById(this.selectedPersonId).subscribe((res) => {
        console.log(res)
        if (res != undefined && res != null) {
          if (res["status"] == Status.success) {
            this.person = res["outputs"]["person"];
            this.shopService.setPerson(this.person);
            this.shopService.buildForm();
          } else {
            this.toastr.error("Something went wrong. Not found person details")
          }
        }
      });
    } else {
      this.person = null;
      this.shopService.setPerson(this.person);
    }

    this.shopService.buildForm();
  }

  personAutoComplete(event: any) {
    if (event.target.value.length > 2) {
      this.getPersonDetailsByNIC(event.target.value);
    }
  }

  setSelectedPerson(person: Person) {
    this.person = person;
    this.shopService.setPerson(person);
    this.shopService.buildForm();
    if (this.person != null) {
      this.getUserByPersonId(this.person.id);
    }
  }

  getPersonDetailsByNIC(nic) {
    this.personService.getByNICLike(nic).subscribe(res => {
      if (res != null && res != undefined) {
        if (res["status"] == Status.success) {
          this.personList = res["outputs"]["person_list"];
        }
      }
    });
  }

  getUserByPersonId(person_id) {
    console.log(person_id)
    return this.userService.getByPersonId(person_id).subscribe(res => {
      if (res != null && res != undefined) {
        if (res["status"] == Status.success) {
          this.user = this.personList = res["outputs"]["user"];
          if (this.user != null) {
            this.shopService.setUser(this.user);
            this.shopService.buildForm();
          }
        }
      }
    });
  }

  submit() {
    this.shopService.submit().subscribe((res:TransferData) => {
      if (res != undefined && res != null) {
        if (res.status == Status.success) {
          this.toastr.success("Shop registered successfully");
          this.reset();
          this.shopService.reset();
          this.shopService.buildForm();
        } else {
          this.resReader.defaultRead(res);
        }
      } else {
        this.toastr.warning("Not found response.")
      }
    });
  }

  update() {
    this.shopService.update().subscribe((res:TransferData)=>{
      if (res != undefined && res != null) {
        if (res.status == Status.success) {
          this.toastr.success("Shop update successfull");
          this.reset();
          this.shopService.reset();
          this.shopService.buildForm();
        } else {
          this.resReader.defaultRead(res);
        }
      } else {
        this.toastr.warning("Not found valid response.")
      }
    });
  }

  reset() {
    this.shop = null;
    this.user = null;
    this.person = null;
  }
}
