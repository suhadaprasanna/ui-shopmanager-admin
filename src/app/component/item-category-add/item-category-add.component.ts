import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/model/object/Object';
import { ItemCategoryService } from 'src/app/service/item-category.service';
import { Status, TransferData } from 'src/app/util/Util';
import { ResponseReader } from 'src/app/service/ResponseReader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-category-add',
  templateUrl: './item-category-add.component.html'
})
export class ItemCategoryAddComponent implements OnInit {

  parent_category:Category;
  resReader = new ResponseReader(this.toastr);
  
  constructor(
    public dialogRef: MatDialogRef<ItemCategoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemCategoryService:ItemCategoryService,
    private toastr:ToastrService,
    ) { }

  ngOnInit() {
    console.log(this.data)
    if(this.data != null && this.data != undefined){
      this.parent_category = this.data.parent_category;
      this.itemCategoryService.category = new Category();
      if(this.parent_category != null && this.itemCategoryService.category == null){
        this.itemCategoryService.category.parent_category = this.parent_category.id;
      }else{
        this.itemCategoryService.category.parent_category = 0;
      }
    }
    this.itemCategoryService.buidForm();
  }

  onCancel(){
    this.data.action = "cancel";
    this.dialogRef.close(this.data);
  }

  addCategory(){
    this.data.action = "add";
    this.itemCategoryService.addCategory().subscribe(
      (res:TransferData)=>{
        if(res.status != undefined && res.status==Status.success){
          if(res.outputs["category"] != undefined && res.outputs["category"] != null){
            this.data.action = "success";
            this.data.category = res.outputs["category"];
            this.dialogRef.close(this.data);
          }
        }else{
          this.resReader.defaultRead(res);
        }
      },
      err=>{

      }
    )
  }
}
