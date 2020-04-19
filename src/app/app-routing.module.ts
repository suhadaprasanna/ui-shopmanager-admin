import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FullRegisterComponent } from './component/full-register/full-register.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { PersonRegisterComponent } from './component/person-register/person-register.component';
import { ShopRegisterComponent } from './component/shop-register/shop-register.component';
import { LoginComponent } from './component/login/login.component';
import { ShopManageComponent } from './component/shop-manage/shop-manage.component';
import { PersonManageComponent } from './component/person-manage/person-manage.component';
import { PersonViewComponent } from './component/person-view/person-view.component';
import { PersonListComponent } from './component/person-list/person-list.component';
import { ShopListComponent } from './component/shop-list/shop-list.component';
import { ShopViewComponent } from './component/shop-view/shop-view.component';
import { SetupManageComponent } from './component/setup-manage/setup-manage.component';
import { SetupEmployeeRoleComponent } from './component/setup-employee-role/setup-employee-role.component';
import { TopBarComponent } from './component/top-bar/top-bar.component';
import { DialogComponent } from './component/plugin/dialog/dialog.component';
import { BottomSheetComponent } from './component/plugin/bottom-sheet/bottom-sheet.component';
import { HttpConnectionErrorComponent } from './component/http-connection-error/http-connection-error.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ItemManageComponent } from './component/item-manage/item-manage.component';
import { ItemAddComponent } from './component/item-add/item-add.component';
import { ItemListComponent } from './component/item-list/item-list.component';
import { ItemViewComponent } from './component/item-view/item-view.component';


const routes: Routes = [
  {
    path : "",redirectTo : "/login", pathMatch : "full"
  },
  {
    path : "login",component : LoginComponent
  },
  {
    path : "home",component : HomeComponent, canActivate:[AuthGuardService]
  },
  {
    path : "register",
    component : RegisterComponent,
    children :[
      {path:"person",component:PersonRegisterComponent},
      {path:"shop",component:ShopRegisterComponent},
      {path:"full",component:FullRegisterComponent},
    ],
    canActivate:[AuthGuardService]
  },
  {
    path:"shop",
    component:ShopManageComponent,
    children:[
      {path:"list",component:ShopListComponent},
      {path:"view",component:ShopViewComponent},
      {path:"update",component:ShopRegisterComponent}
    ],
    canActivate:[AuthGuardService]
  },
  {
    path:"person",
    component:PersonManageComponent,
    children:[
      {path:"",redirectTo:"list",pathMatch:"full"},
      {path:"view",component:PersonViewComponent},
      {path:"list",component:PersonListComponent},
      {path:"update",component:PersonRegisterComponent}
    ],
    canActivate:[AuthGuardService]
  },
  {
    path:"item",
    component:ItemManageComponent,
    children:[
      {path:"add",component:ItemAddComponent},
      {path:"list",component:ItemListComponent},
      {path:"view",component:ItemViewComponent}
    ],
    canActivate:[AuthGuardService]
  },
  {
    path:"setup",component:SetupManageComponent,
    children:[
      {path:"emprole",component:SetupEmployeeRoleComponent}
    ],
    canActivate:[AuthGuardService]
  },
  {
    path:"**",component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
  TopBarComponent,
  HomeComponent,LoginComponent,
  ShopManageComponent,ShopListComponent,ShopViewComponent,
  PersonManageComponent,PersonListComponent,PersonViewComponent,
  RegisterComponent,PersonRegisterComponent,ShopRegisterComponent,FullRegisterComponent,
  SetupManageComponent,SetupEmployeeRoleComponent,
  ItemManageComponent,ItemAddComponent,ItemListComponent,ItemViewComponent,
  PageNotFoundComponent,
  DialogComponent,BottomSheetComponent,
  HttpConnectionErrorComponent
]