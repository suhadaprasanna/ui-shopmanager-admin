import { Injectable } from '@angular/core';
import { APILink, getHeaders } from '../util/APIManage';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { convertJsontoFormData } from '../model/form/FormUtil';

@Injectable({
  providedIn: 'root'
})
export class ShopEmployeeService {

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private httpClient:HttpClient
  ) { }

  getEmployiesByShopId(param){
    if (param.shop_id == null || param.shop_id == undefined || param.shop_id == "") {
      this.toastr.error("Not found shop Id", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    })
    let obj = convertJsontoFormData(param,null,null);
    return this.httpClient.post(APILink.shopAPIURL + "/shopemp/get/shopid/", obj,headers);
  }
}
