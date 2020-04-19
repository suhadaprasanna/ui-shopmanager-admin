import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../model/object/Object';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { getHeaders, APILink } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';
import { isItemCodeExist, isItemNameExist } from '../util/validators/AsyncValidator';
import { getDate } from '../util/Util';
import { ItemFilterForm } from '../model/form/Form';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  form:FormGroup;
  item:Item;
  isProcessing:boolean = false;
  filterForm:ItemFilterForm;

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private httpClient:HttpClient
  ) { }

  buidForm(){
    if(this.item==null||this.item==undefined){
      this.item = new Item();
      this.item.status = "Y";
      this.item.sys_add_date = new Date();
    }

    this.form = this.formBuilder.group({
      id:[this.item.id],
      name:[this.item.name,[Validators.required],isItemNameExist(this)],
      code:[this.item.code,[Validators.required],isItemCodeExist(this)],
      barcode:[this.item.barcode],
      status:[this.item.status],
      image_path:[this.item.image_path],
      image_file:[''],
      sys_add_date:[getDate(this.item.sys_add_date,"YMD","-")]
    });
  }

  onFileChange(event) {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        image_file: file
      });
    }
  }

  setItem(item:Item){
    this.item = item;
  }

  reset(){
    this.item = null;
    this.isProcessing = false;
    if(this.form != null && this.form != undefined)
      this.form.reset();
    this.buidForm();
  }

  add(){
    this.isProcessing = true;
    let headers = getHeaders({
      authorization:"token"
    });
    let _form = convertJsontoFormData(this.form.value,null,null);
    return this.httpClient.post(APILink.itemAPIURL + "/item/add", _form,headers);
  }

  update(){
    this.isProcessing = true;
    let headers = getHeaders({
      authorization:"token"
    });
    let _form = convertJsontoFormData(this.form.value,null,null);
    return this.httpClient.post(APILink.itemAPIURL + "/item/update", _form,headers);
  }

  getItems(form:ItemFilterForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/get",_form,headers);
  }

  getItemByCode(item_code:String){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData({"code":item_code},null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/get/bycode",_form,headers);
  }

  getItemByName(item_name:String){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData({"name":item_name},null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/get/byname",_form,headers);
  }

  itemEnableDisable(item_code:String,status:boolean){
    let headers = getHeaders({
      authorization:"token"
    });
    let form = {"code":item_code,"status":(status?"Y":"N")}
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/enable_disable",_form,headers);
  }
}
