import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopServiceService } from 'src/app/service/shop-service.service';
import { Status, TransferData } from 'src/app/util/Util';
import { Shop, User, ShopEmployee } from 'src/app/model/object/Object';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ShopEmployeeService } from 'src/app/service/shop-employee.service';
import { ResponseReader } from 'src/app/service/ResponseReader';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html'
})
export class ShopViewComponent implements OnInit {

  isLoading = false;
  selectedId;
  shop: Shop;
  user: User[];
  shopEmployeeList: ShopEmployee[];
  resReader = new ResponseReader(this.toastr);

  constructor(
    private shopService: ShopServiceService,
    private shopEmployeeService: ShopEmployeeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commonService: CommonServiceService
  ) { }

  ngOnInit() {
    this.loadShopDetails();
  }

  loadShopDetails() {
    this.isLoading = true;
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.get("shop_id") != undefined || params.get("shop_id") != "") {
        this.selectedId = params.get("shop_id");
      }
    });

    if (this.selectedId != undefined && this.selectedId != null && this.selectedId != "") {
      this.shopService.getById(this.selectedId).subscribe((res: TransferData) => {
        this.isLoading = false;
        if (res != undefined && res != null) {
          if (res.status == Status.success) {
            this.shop = res.outputs["shop"];
          } else {
            this.toastr.error("Something went wrong. Not found person details")
          }
        }
      });
    }
  }

  loadEmployeeDetails() {
    this.isLoading = true;
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.get("shop_id") != undefined || params.get("shop_id") != "") {
        this.selectedId = params.get("shop_id");
      }
    });
    if (this.selectedId != undefined && this.selectedId != null && this.selectedId != "") {
      this.shopEmployeeService.getEmployiesByShopId({"shop_id":this.selectedId,"with_person_details":true}).subscribe(
        (res: TransferData) => {
          console.log(res)
          this.isLoading = false;
          if (res != undefined && res != null) {
            if (res.status == Status.success) {
              this.shopEmployeeList = res.outputs["shop_employee_list"];
            } else {
              this.resReader.defaultRead(res);
            }
          }
        });
    }
  }

  tabChanged($event) {
    if ($event.index == 0) {
      this.loadShopDetails();
    } else if ($event.index == 1) {
      this.loadEmployeeDetails();
    }
  }
}
