import { Injectable, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Item } from '../model/object/Object';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { getHeaders, APILink } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';
import { isItemCodeExist, isItemNameExist } from '../util/validators/AsyncValidator';
import { getDate } from '../util/Util';
import { ItemForm } from '../model/form/Form';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  form:FormGroup;
  item:Item;
  isProcessing:boolean = false;
  filterForm:ItemForm;

  image_file:any=null;
  image_path:String="";

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
      sys_add_date:[getDate(this.item.sys_add_date,"YMD","-")],
      category_list:this.formBuilder.array([])
    });
  }

  onChangeCategoryItemList(e,node){
    const checkArray: FormArray = this.form.get('category_list') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(node.object.id));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == node.object.id) {
          checkArray.removeAt(i);
          return;
        }
        i++;
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
    _form.append("image_file",this.image_file); // adding image
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

  getItems(form:ItemForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/get",_form,headers);
  }

  getItemByCode(form:ItemForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/get/bycode",_form,headers);
  }

  getItemByName(form:ItemForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/get/byname",_form,headers);
  }

  itemEnableDisable(form:ItemForm){
    let headers = getHeaders({
      authorization:"token"
    });
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/enable_disable",_form,headers);
  }
}
