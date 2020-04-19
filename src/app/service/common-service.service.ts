import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../util/Util';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  label_list = "";
  selectedType = "";
  readonly shopAPIURL="http://localhost:8086/apishop";

  constructor(
    private httpClient:HttpClient,
    private toastr:ToastrService,
    private cookieService:CookieService
  ) { }

  loadLabelPack(){
    let type = this.getlangType();
    this.setLangPack(type);
  }

  setLangPack(type){
    this.getLabelPack(type).subscribe(res=>{
      if(res != undefined && res != null){
        if(res["status"]==Status.success){
          let labelPack = res["outputs"]["label_pack_list"];
          if(labelPack != undefined && labelPack != null && labelPack != ""){
            this.label_list = labelPack;
            this.selectedType = type;
          }
        }
      }else{
        this.toastr.warning("Not found valid response for lang pack");
      }
    });
  }

  // Api call
  getLabelPack(type){
    return this.httpClient.post(this.shopAPIURL+"/common/labelpack/"+type,{});
  }

  // return label list
  getLabelList(){
    if(this.label_list == undefined || this.label_list == null || this.label_list == ""){
      this.loadLabelPack();
    }
    return this.label_list;
  }

  // retrive lang type from cookie
  getlangType(){
    let lang_type = this.cookieService.get("lang_type");
    if(lang_type==undefined||lang_type==null||lang_type==""){
      lang_type = "ENG";
    }
    return lang_type;
  }
}
