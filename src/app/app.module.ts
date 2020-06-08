import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppBootstrapModule } from './app-bootstrap.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { DialogComponent } from './component/plugin/dialog/dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ItemCategoryAddComponent } from './component/item-category-add/item-category-add.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ImageCropperModule
  ],
  entryComponents: [
    DialogComponent,
    ItemCategoryAddComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
