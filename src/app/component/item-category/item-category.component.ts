import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/object/Object';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemCategoryService } from 'src/app/service/item-category.service';
import { Status, TransferData } from 'src/app/util/Util';
import { faPlus, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ItemCategoryAddComponent } from '../item-category-add/item-category-add.component';
import { TreeNode } from '../plugin/tree/tree-node-view/tree-node-view.component';
import { ResponseReader } from 'src/app/service/ResponseReader';
import { ToastrService } from 'ngx-toastr';
import { CategoryForm } from 'src/app/model/form/Form';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html'
})
export class ItemCategoryComponent implements OnInit {

  icon_faPlus = faPlus;
  icon_faAngleRight = faAngleRight;
  
  treeList:TreeNode[]=[];
  categoryList:Category[]=[];
  resReader = new ResponseReader(this.toastr);
  isLoading:boolean=false;

  constructor(
    public dialog: MatDialog,
    private itemCategoryService: ItemCategoryService,
    private toastr:ToastrService
  ) {}

  ngOnInit() {
    this.getCategoriesByParent(0);
    this.treeList=this.itemCategoryService.createTreeList(this.categoryList,0,null);
  }

  getCategoriesByParent(parent_id){
    this.isLoading = true;
    let form = new CategoryForm();
    form.parent_category = parent_id;
    form.withSubCategories = true;
    this.itemCategoryService.getCategoriesByParent(form).subscribe((res:TransferData)=>{
      this.isLoading = false;
      if(res.status != undefined && res.status==Status.success){
        this.categoryList = res.outputs["list"];
        this.treeList=this.itemCategoryService.createTreeList(this.categoryList,0,null);
      }else{
        this.resReader.defaultRead(res);
      }
    });
  }

  addCategory(parent_category){
    this.isLoading = true;
    let dialogRef = this.dialog.open(ItemCategoryAddComponent, {
      height: '350px',
      width: '300px',
      data:{
        parent_category:parent_category
      }
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        this.isLoading = false;
        if(res != undefined){
          if(res.action == "success"){
            this.getCategoriesByParent(0);
            this.treeList=this.itemCategoryService.createTreeList(this.categoryList,0,null);
          }
        }
      });
  }

  updateCategory(category){
    this.isLoading = true;
    let dialogRef = this.dialog.open(ItemCategoryAddComponent, {
      height: '350px',
      width: '300px',
      data:{
        category:category
      }
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        this.isLoading = false;
        if(res != undefined){
          if(res.action == "success"){
            this.getCategoriesByParent(0);
            this.treeList=this.itemCategoryService.createTreeList(this.categoryList,0,null);
          }
        }
      });
  }

  categoryEnableDisable(event,category){
    console.log(category)
    console.log(event)
    if(event.target.checked == true){
      category.status = "Y";
    }else{
      category.status = "N";
    }
  }

}
