import { Injectable } from '@angular/core';
import { getHeaders, APILink } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/object/Object';
import { getDate } from '../util/Util';
import { isCategoryNameExist, isCategoryCodeExist } from '../util/validators/AsyncValidator';
import { CategoryForm } from '../model/form/Form';
import { TreeNode } from '../component/plugin/tree/tree-node-view/tree-node-view.component';

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

  reset(){
    this.category = new Category();
    this.buidForm();
  }

  setParentCategoryId(parent_id){
    if(this.category==null)
      this.category = new Category();
    this.category.parent_category = parent_id;
  }

  addCategory(){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(this.form.value,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/add",_form,headers);
  }

  updateCategory(){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(this.form.value,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/update",_form,headers);
  }

  getCategory(form:CategoryForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get",_form,headers);
  }

  getCategoriesByParent(form:CategoryForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get/byparent",_form,headers);
  }

  getCategoryByName(form:CategoryForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get/byname",_form,headers);
  }

  getCategoryByCode(form:CategoryForm){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.itemAPIURL+"/item/category/get/bycode",_form,headers);
  }

  /**
   * 
   * @param list object list
   * @param level 
   * @param parent parent object if exist
   */
  createTreeList(list:any[],level:number,parent:any){
    if(level<=0)
      level =1;
    let treelist:TreeNode[] = [];
    list.forEach(element => {
      let ele:Category = element;
      let node = new TreeNode();
      node.level = level;
      node.object = ele;
      node.name = ele.name;
      node.status = ele.status;
      // set parent's ID
      if(parent != null){
        node.parentId = parent.id;
      }
      // checking sub objects
      if(ele.sub_category != null && ele.sub_category.length>0){
        node.hasChildren = true;
        treelist.push(node);
        treelist = treelist.concat(this.createTreeList(ele.sub_category,(level+1),ele));
      }else{
        treelist.push(node);
      }
    });
    return treelist;
  }
}
