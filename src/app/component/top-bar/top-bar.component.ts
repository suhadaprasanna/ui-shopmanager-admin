import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {

  icon_faEllipsisH = faEllipsisH;
  lang_list = ["ENG","SIN"];

  constructor(
    private commonService:CommonServiceService,
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
    
  }

  changeLanguage(type){
    this.commonService.setLangPack(type);
  }

}
