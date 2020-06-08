import { Injectable } from '@angular/core';
import { getHeaders, APILink } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/object/Object';
import { getDate } from '../util/Util';
import { isCategoryNameExist, isCategoryCodeExist } from '../util/validators/AsyncValidator';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {

  form:FormGroup;
  category:Category;

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private httpClient:HttpClient
  ) { }

  buidForm(){
    if(this.category==null||this.category==undefined){
      this.category = new Category();
    }

    this.form = this.formBuilder.group({
      id:[this.category.id],
      name:[this.category.name,[Validators.required],isCategoryNameExist(this)],
      code:[this.category.code,[Validators.required],isCategoryCodeExist(this)],
      status:[this.category.status],
      parent_category:[this.category.parent_category]
    });
  }

  addCategory(){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(this.form.value,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/add",_form,headers);
  }

  update(){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(this.form.value,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/update",_form,headers);
  }

  getCategories(id){
    let form = {"id":id}
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get",_form,headers);
  }

  getCategoryByName(name){
    let form = {"name":name}
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get/byname",_form,headers);
  }

  getCategoryByCode(code){
    let form = {"code":code}
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get/bycode",_form,headers);
  }
}
