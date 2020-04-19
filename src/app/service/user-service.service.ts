import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { convertJsontoFormData } from '../model/form/FormUtil';
import { getHeaders } from '../util/APIManage';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  readonly shopAPIURL="http://localhost:8086/apishop";

  constructor(
    private toastr:ToastrService,
    private httpClient:HttpClient
  ) { }

  getById(param){
    if (param.id == null || param.id == undefined || param.id == "") {
      this.toastr.error("Not found id", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    })
    let obj = convertJsontoFormData(param,null,null);
    return this.httpClient.post(this.shopAPIURL + "/user/get/id/" + param.id, obj,headers);
  }
  
  getByPersonId(param){
    if (param.id == null || param.id == undefined || param.id == "") {
      this.toastr.error("Not found person id", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    })
    let obj = convertJsontoFormData(param,null,null);
    return this.httpClient.post(this.shopAPIURL + "/user/get/person/id/" + param.id, obj,headers);
  }

  getAllUsers(param){
    let headers = getHeaders({
      authorization:"token"
    })
    let obj = convertJsontoFormData(param,null,null);
    return this.httpClient.post(this.shopAPIURL + "/user/get/all/", obj,headers);
  }
}
