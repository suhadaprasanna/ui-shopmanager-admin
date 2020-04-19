import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Shop, ShopContact, Person, User, ShopEmail, ShopEmployee } from '../model/object/Object';
import { StringValidator, ContactNumberValidator } from '../util/validators/Validator';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { APILink, getHeaders } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';
import { ShopFilterForm } from '../model/form/Form';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  form:FormGroup;
  shop:Shop;
  person:Person;
  user:User;
  shopEmployee:ShopEmployee;
  filterForm:ShopFilterForm;

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private httpClient:HttpClient
  ) { }

  buildForm(){
    
    if(this.shop==null||this.shop==undefined){
      this.shop = new Shop();
    }
    if(this.person==null||this.person==undefined){
      this.person = new Person();
    }
    if(this.user==null||this.user==undefined){
      this.user = new User();
    }
    if(this.shopEmployee==null||this.shopEmployee==undefined){
      this.shopEmployee = new ShopEmployee();
    }

    this.form = this.formBuilder.group({
      id:[this.shop.id],
      shop_name:[this.shop.shop_name,[Validators.required,StringValidator]],
      shop_code:[this.shop.shop_code],
      shop_register_date:[this.shop.shop_register_date],
      email:[this.shop.email,[Validators.email]],
      contact1:[this.shop.contact1],
      contact2:[this.shop.contact2],
      addressl1:[this.shop.addressl1],
      addressl2:[this.shop.addressl2],
      addressl3:[this.shop.addressl3],
      shop_register_number:[this.shop.shop_register_number],
      status:[this.shop.status],
      person_id:[(this.person!=undefined && this.person != null? this.person.id:this.shop.person_id)],
      user_id:[(this.user != undefined && this.user != null ? this.user.id:this.shop.user_id)],
      person_nic:[(this.person!=undefined && this.person != null?this.person.nic:"")],
      person_first_name:[(this.person!=undefined && this.person != null?this.person.first_name:"")],
      person_last_name:[(this.person!=undefined && this.person != null?this.person.last_name:"")],
      contacts: this.formBuilder.array(this.buildContactArray(this.shop.contacts)),
      emails: this.formBuilder.array(this.buildEmailArray(this.shop.emails)),
      person_register_date:[this.shopEmployee.register_date],
      username:[this.shopEmployee.username],
      password:[this.shopEmployee.password],
      employee_role_code:['']
    });
  }

  /* contact-------------------------------- */
  private buildContactArray(contacts: ShopContact[]) {
    let list_contacts = [];
    if (contacts != undefined && contacts != null && contacts.length > 0) {
      contacts.forEach(_contact => {
        list_contacts.push(this.buildContactGroup(_contact));
      });
    } else {
      list_contacts.push(this.buildContactGroup(null));
    }
    return list_contacts;
  }
  private buildContactGroup(contact: ShopContact) {
    return this.formBuilder.group({
      id: [contact != null ? contact.id : ''],
      number: [contact != null ? contact.contact : '', [Validators.required, ContactNumberValidator]],
      status: [contact != null ? contact.status : "Y"],
    });
  }
  public getContactGroup(index) {
    return (<FormArray>this.form.get('contacts'))[index];
  }
  public addContactToForm() {
    (<FormArray>this.form.get('contacts')).push(this.buildContactGroup(null));
  }
  public removeContactFromForm(index) {
    let list = (<FormArray>this.form.get('contacts'));
    if (list.length > 1) {
      list.removeAt(index);
    } else {
      this.toastr.warning("Can not remove", "Warning");
    }
  }
  public getContactsFromForm() {
    return (<FormArray>this.form.get('contacts'));
  }
  /* -------------------------------------- */  
  /* email-------------------------------- */
  private buildEmailArray(emails: ShopEmail[]) {
    let list_emails = [];
    if (emails != undefined && emails != null && emails.length > 0) {
      emails.forEach(_email => {
        list_emails.push(this.buildEmailGroup(_email));
      });
    } else {
      list_emails.push(this.buildEmailGroup(null));
    }
    return list_emails;
  }
  private buildEmailGroup(email) {
    return this.formBuilder.group({
      id: [email != null ? email.id : ''],
      email: [email != null ? email.email : '', [Validators.email]],
      add_date: [email != null ? email.add_date : new Date()],
      status: [email != null ? email.status : "Y"],
    });
  }
  public getEmailGroup(index) {
    return (<FormArray>this.form.get('emails'))[index];
  }
  public addEmailToForm() {
    (<FormArray>this.form.get('emails')).push(this.buildEmailGroup(null));
  }
  // remove email
  public removeEmailFromForm(index) {
    let list = (<FormArray>this.form.get('emails'));
    if (list.length > 1) {
      list.removeAt(index);
    } else {
      this.toastr.warning("Can not remove", "Warning");
    }
  }
  public getEmailsFromForm() {
    return (<FormArray>this.form.get('emails'));
  }
  /* -------------------------------------- */

  reset(){
    this.shop = null;
    this.person = null;
    this.user = null;
  }

  submit(){
    if (this.form.valid) {
      let headers = getHeaders({
        authorization:"token"
      })
      return this.httpClient.post(APILink.shopAPIURL+"/shop/add",this.form.value,headers);
    }else{
      return null;
    }
  }

  update(){
    if (this.form.valid) {
      let headers = getHeaders({
        authorization:"token"
      })
      return this.httpClient.post(APILink.shopAPIURL+"/shop/update",this.form.value,headers);
    }else{
      return null;
    }
  }

  setShop(shop:Shop){
    this.shop = shop;
  }

  setPerson(person:Person){
    this.person = person;
  }

  setUser(user:User){
    this.user = user;
  }

  /**
   * 
   * @param param count,start,order
   */
  getShopList(form){
    let headers = getHeaders({
      authorization:"token"
    })
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.shopAPIURL+"/shop/get",_form,headers);
  }

  getById(id){
    if (id == null || id == undefined || id == "") {
      this.toastr.error("Not found id", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    })
    return this.httpClient.post(APILink.shopAPIURL + "/shop/get/id/" + id, "{}",headers);
  }

  shopEnableDisable(shop_code:String,status:boolean){
    let headers = getHeaders({
      authorization:"token"
    });
    let form = {"shop_code":shop_code,"status":(status?"Y":"N")}
    let _form = convertJsontoFormData(form,null,null);
    return this.httpClient.post(APILink.shopAPIURL+"/shop/enable_disable",_form,headers);
  }
}
