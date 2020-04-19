import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/service/shop-service.service';
import { ToastrService } from 'ngx-toastr';
import { Shop } from 'src/app/model/object/Object';
import { Status } from 'src/app/util/Util';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ShopFilterForm } from 'src/app/model/form/Form';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html'
})
export class ShopListComponent implements OnInit {

  icon_faRedo = faRedo;
  shopList:Shop[];

  constructor(
    private shopService:ShopServiceService,
    private toastr:ToastrService,
    private commonService:CommonServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.shopService.filterForm = new ShopFilterForm();
    this.shopService.filterForm.count = 10;
    this.shopService.filterForm.status = "ALL";
    this.getShopList();
  }

  getShopList(){
    this.shopService.getShopList(this.shopService.filterForm).subscribe(res=>{
      if(res != null && res != undefined){
        if(res["status"]==Status.success){
          this.shopList = res["outputs"]["list"];
          this.shopService.filterForm.page_count = res["outputs"]["page_count"];
          this.shopService.filterForm.total_count = res["outputs"]["total_count"];
        }else{
          this.toastr.error("Something went wrong","");
        }
      }
    });
  }

  shopEnableDisable(event:any,shop_code:String){
    this.shopService.shopEnableDisable(shop_code,event.target.checked).subscribe(
      (res)=>{
        if(res["status"]==Status.success){
          let updated_shop = res["outputs"]["shop"];
          if(updated_shop != null && updated_shop != undefined && updated_shop != ""){
            for (let i = 0; i < this.shopList.length; i++) {
              if(this.shopList[i].shop_code==shop_code){
                this.shopList[i] = updated_shop;
                this.snackBar.open(updated_shop.shop_name,(updated_shop.status=="Y"?"Enabled":"Disabled"),{
                  duration: 3000
                });
                break;
              }
            }
            
          }
        }
      },
      (err)=>{
        event.target.checked = false;
      }
    );
  }
}
