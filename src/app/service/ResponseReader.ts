import { Status } from '../util/Util';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseReader {

    constructor(
        private toastr:ToastrService
    ){}

    public defaultRead(res:any){
        let status = res.status;
        if(status==Status.NA){
            this.toastr.error("Did not recevive valid response","Response Error");
        }else if(status==Status.warning){
            let _list = res.outputs["warning_list"];
            if(_list != undefined && _list != null && _list != "" && _list.length>0){
                for(let i=0;i<_list.length;i++){
                    this.toastr.warning(_list[i],"Warning");
                }
            }else{
                this.toastr.warning("Something went wrong","Warning");
            }
        }else if(status==Status.error){
            let _list = res.outputs["error_list"];
            if(_list != undefined && _list != null && _list != "" && _list.length>0){
                for(let i=0;i<_list.length;i++){
                    this.toastr.error(_list[i],"Error");
                }
            }else{
                this.toastr.error("Something went wrong","Error");
            }
        }else if(status==Status.message || status==Status.fail){
            let _list = res.outputs["message_list"];
            if(_list != undefined && _list != null && _list != "" && _list.length>0){
                for(let i=0;i<_list.length;i++){
                    this.toastr.info(_list[i],(status==Status.message?"Info":"Fail"));
                }
            }else{
                this.toastr.info("Something went wrong","Info");
            }
        }else{
            this.toastr.error("Something went wrong",status);
        }
    }
}