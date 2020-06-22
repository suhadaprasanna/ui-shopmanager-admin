import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { ToastrService } from 'ngx-toastr';
import { Status, base64ImageToBlob, TransferData } from 'src/app/util/Util';
import { Item, Category } from 'src/app/model/object/Object';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ResponseReader } from 'src/app/service/ResponseReader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { TreeNode } from '../plugin/tree/tree-node-view/tree-node-view.component';
import { ItemCategoryService } from 'src/app/service/item-category.service';
import { CategoryForm, ItemForm } from 'src/app/model/form/Form';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent implements OnInit {

  newItemList: Item[] = [];
  selectedItemId = "";
  selectedItemCode = "";
  panelOpenState = false;
  treeList:TreeNode[]=[];
  categoryList:Category[]=[];

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private commonService: CommonServiceService,
    private itemService: ItemServiceService,
    private itemCategoryService: ItemCategoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private resReader:ResponseReader
  ) { }

  ngOnInit() {
    this.itemService.reset();
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.get("item_id") != undefined || params.get("item_id") != "") {
        this.selectedItemId = params.get("item_id");
      }
      if (params.get("item_code") != undefined || params.get("item_code") != "") {
        this.selectedItemCode = params.get("item_code");
      }
    });

    if (this.selectedItemCode != null && this.selectedItemCode != undefined && this.selectedItemCode != "") {
      this.getItemByCode(this.selectedItemCode);
    }
    this.loadCategories(0);
    this.itemService.buidForm();
  }

  add() {
      if (this.itemService.form.valid) {
        this.itemService.add().subscribe(
          (res) => {
            this.itemService.isProcessing = false;
            if (res['status'] == Status.success) {
              this.newItemList.push(res["outputs"]["item"]);
              this.itemService.reset();
              this.snackBar.open("Added "+res["outputs"]["item"].name,"Successfully",{
                duration: 3000
              });
            }else{
              this.resReader.defaultRead(res);
            }
          },
          (err)=>{
            this.itemService.isProcessing = false;
          });
      } else {
        this.toastr.warning("Invalid Form", "Warning", {
          closeButton: true,
          timeOut: 4000
        })
      }
  }

  update(){
    if (this.itemService.form.valid) {
      this.itemService.update().subscribe(
        (res) => {
          console.log(res)
          this.itemService.isProcessing = false;
          if (res['status'] == Status.success) {
            this.newItemList.push(res["outputs"]["item"]);
            this.itemService.reset();
            this.snackBar.open("Updated "+res["outputs"]["item"].name,"Successfully",{
              duration: 3000
            });
          }else{
            this.resReader.defaultRead(res);
          }
        });
    } else {
      this.toastr.warning("Invalid Form", "Warning", {
        closeButton: true,
        timeOut: 4000
      })
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event)
    this.croppedImage = event.base64;
    //this.itemService.image_file = base64ImageToBlob(this.croppedImage);
    console.log(this.imageChangedEvent);
    let value = this.imageChangedEvent.target.value;
    let filename = value.substring((value.lastIndexOf("\\")+1),value.length).split(".");
    this.itemService.image_file = new File(
      [base64ImageToBlob(this.croppedImage)], 
      (filename[0]+"."+filename[1]), 
      {type: (`image/`+filename[1])}
    );
  }
  imageLoaded() {
    //console.log("image loaded")
  }
  cropperReady() {
    //console.log("crop ready")
  }
  loadImageFailed() {
    //console.log("image load failed")
  }

  loadCategories(id){
    let form =new CategoryForm();
    form.parent_category = id;
    form.withSubCategories=true;
    this.itemCategoryService.getCategoriesByParent(form).subscribe(
      (res:TransferData)=>{
        if(res.status ==Status.success){
          this.categoryList = res.outputs["list"];
          this.treeList = this.itemCategoryService.createTreeList(this.categoryList,0,null);
        }
      }
    );
  }

  getItemByCode(code){
    let form = new ItemForm();
    form.code = code;
    this.itemService.getItemByCode(form).subscribe(
      (res) => {
        if (res["status"] == Status.success) {
          this.itemService.item = res["outputs"]["item"];
          this.itemService.buidForm();
        }
      }
    );
  }

}
