import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { Item } from 'src/app/model/object/Object';
import { Status } from 'src/app/util/Util';
import { MatSnackBar } from '@angular/material';
import { ItemForm } from 'src/app/model/form/Form';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

  icon_faRedo = faRedo;

  itemList:Item[];
  isLoading:boolean;
  
  constructor(
    private commonService:CommonServiceService,
    private itemService:ItemServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.itemService.filterForm = new ItemForm();
    this.itemService.filterForm.count = 10;
    this.itemService.filterForm.status = "ALL";
    if(this.itemList == null || this.itemList == undefined || this.itemList.length <= 0)
      this.getItems();
  }

  getItems(){
    this.isLoading = true;
    this.itemService.getItems(this.itemService.filterForm).subscribe(
      (res)=>{
        this.isLoading = false;
        if(res["status"]==Status.success){
          this.itemList = res["outputs"]["list"];
          
          this.itemService.filterForm.page_count = res["outputs"]["page_count"];
          this.itemService.filterForm.total_count = res["outputs"]["total_count"];
        }else{
          this.itemList = [];
        }
      },
      (err)=>{
        this.itemList = [];
      }
    )
  }

  itemEnableDisable(event:any,item_code){
    this.isLoading = true;
    
    let form = new ItemForm();
    form.code = item_code;
    form.status = (event.target.checked?"Y":"N");
    this.itemService.itemEnableDisable(form).subscribe(
      (res)=>{
        this.isLoading = false;
        if(res["status"]==Status.success){
          let updated_item = res["outputs"]["item"];
          if(updated_item != null && updated_item != undefined && updated_item != ""){
            for (let i = 0; i < this.itemList.length; i++) {
              if(this.itemList[i].code==item_code){
                this.itemList[i] = updated_item;
                this.snackBar.open(updated_item.name,(updated_item.status=="Y"?"Enabled":"Disabled"),{
                  duration: 3000
                });
                break;
              }
            }
            
          }
        }
      },
      (err)=>{
        this.isLoading = false;
        event.target.checked = false;
      }
    );
  }

}
