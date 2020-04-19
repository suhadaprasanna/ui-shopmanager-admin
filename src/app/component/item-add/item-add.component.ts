import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/util/Util';
import { Item } from 'src/app/model/object/Object';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ResponseReader } from 'src/app/service/ResponseReader';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent implements OnInit {

  newItemList: Item[] = [];
  selectedItemId = "";
  selectedItemCode = "";

  constructor(
    private commonService: CommonServiceService,
    private itemService: ItemServiceService,
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
      this.itemService.getItemByCode(this.selectedItemCode).subscribe(
        (res) => {
          if (res["status"] == Status.success) {
            this.itemService.item = res["outputs"]["item"];
            this.itemService.buidForm();
          }
        }
      );
    }
    this.itemService.buidForm();
    console.log(this.itemService.item)
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

}
