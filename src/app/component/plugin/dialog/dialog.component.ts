import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Key } from 'src/app/util/Util';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {

  isResponseError = false;
  res:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.setDefault();
    console.log("inittttttt dialog")
    if(this.data != undefined && this.data != null){
      if(this.data["type"] != undefined && this.data["type"] != "") {
        if(this.data["type"]==Key.RESPONSE_ERROR){
          this.isResponseError = true;
          this.res = this.data["res"];
        }
      }
    }
  }

  setDefault(){
    this.isResponseError = false;
  }
}
