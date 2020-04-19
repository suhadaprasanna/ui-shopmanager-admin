import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Person } from '../model/object/Object';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ContactNumberValidator } from '../util/validators/Validator';
import { PersonAddress } from '../model/object/Object';
import { PersonContact } from '../model/object/Object';
import { PersonEmail } from '../model/object/Object';
import { Status } from '../util/Util';
import { APILink, getHeaders } from '../util/APIManage';
import { convertJsontoFormData } from '../model/form/FormUtil';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  form: FormGroup;
  person: Person;
  isSubmitting = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) { }

  buildForm() {
    if (this.person == null || this.person == undefined) {
      this.person = new Person();
    }
    this.form = this.formBuilder.group({
      id: [this.person.id],
      first_name: [this.person.first_name, [Validators.required]],
      last_name: [this.person.last_name, [Validators.required]],
      middle_name: [this.person.middle_name],
      sur_name: [this.person.sur_name],
      gender: [this.person.gender, [Validators.required]],
      nic: [this.person.nic],
      email: [this.person.email],
      birth_day: [this.person.birth_day],
      contact1: [this.person.contact1],
      contact2: [this.person.contact2],
      addressl1: [this.person.addressl1],
      addressl2: [this.person.addressl2],
      addressl3: [this.person.addressl3],
      addressl4: [this.person.addressl4],
      status: [this.person.status],
      addresses: this.formBuilder.array(this.buildAddressArray(this.person.addresses)),
      contacts: this.formBuilder.array(this.buildContactArray(this.person.contacts)),
      emails: this.formBuilder.array(this.buildEmailArray(this.person.emails)),
    });
  }

  /* Address-------------------------------- */
  private buildAddressArray(addresses: PersonAddress[]) {
    let list_addresses = [];
    if (addresses != undefined && addresses != null && addresses.length > 0) {
      addresses.forEach(_address => {
        list_addresses.push(this.buildAddressGroup(_address));
      });
    } else {
      list_addresses.push(this.buildAddressGroup(null));
    }
    return list_addresses;
  }
  private buildAddressGroup(address: PersonAddress) {
    return this.formBuilder.group({
      id: [address != null ? address.id : ''],
      addressl1: [address != null ? address.addressl1 : ""],
      addressl2: [address != null ? address.addressl2 : ""],
      addressl3: [address != null ? address.addressl3 : ""],
      addressl4: [address != null ? address.addressl4 : ""],
      status: [address != null ? address.status : "Y"]
    });
  }
  public getAddressGroup(index) {
    return (<FormArray>this.form.get('addresses'))[index];
  }
  public getAddressesFromForm() {
    return (<FormArray>this.form.get('addresses'));
  }
  public addAddressToForm() {
    (<FormArray>this.form.get('addresses')).push(this.buildAddressGroup(null));
  }
  public removeAddressFromForm(index) {
    let list = (<FormArray>this.form.get('addresses'));
    if (list.length > 1) {
      list.removeAt(index);
    } else {
      this.toastr.warning("Can not remove", "Warning");
    }
  }
  /* -------------------------------------- */
  /* contact-------------------------------- */
  private buildContactArray(contacts: PersonContact[]) {
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
  private buildContactGroup(contact: PersonContact) {
    return this.formBuilder.group({
      id: [contact != null ? contact.id : ''],
      number: [contact != null ? contact.number : '', [Validators.required, ContactNumberValidator]],
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
  private buildEmailArray(emails: PersonEmail[]) {
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

  reset() {
    this.person = null;
  }

  setPerson(person: Person) {
    this.person = person;
  }

  submit() {
    if (this.form.valid) {
      let _form = convertJsontoFormData(this.form.value,null,null);
      let headers = getHeaders({
        authorization:"token"
      });
      return this.httpClient.post(APILink.personAPIURL+"/person/add",_form,headers);
    }else{
      return null;
    }
  }

  update() {
      return this.httpClient.post(APILink.personAPIURL+"/person/update",this.form.value,this.httpOptions);
  }

  getPersonList(param) {
    let query = {};
    if (param != null && param != undefined && param != "") {
      if (param.count != undefined) {
        query["count"] = param.count;
      }
      if (param.start != undefined) {
        query["start"] = param.start;
      }
      if (param.order != undefined) {
        query["order"] = param.order;
      }
    }
    let headers = getHeaders({
      authorization:"token"
    });
    return this.httpClient.post(APILink.personAPIURL + "/person/get", query,headers);
  }

  getById(id) {
    if (id == null || id == undefined || id == "") {
      this.toastr.error("Not found id", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    });
    return this.httpClient.post(APILink.personAPIURL + "/person/get/id/" + id, "{}",headers);
  }

  getByNIC(nic) {
    if (nic == null || nic == undefined || nic == "") {
      this.toastr.error("Not found NIC", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    });
    return this.httpClient.post(APILink.personAPIURL + "/person/get/nic/" + nic, "{}",headers);
  }

  getByNICLike(nic){
    if (nic == null || nic == undefined || nic == "") {
      this.toastr.error("Not found NIC", "");
      return null;
    }
    let headers = getHeaders({
      authorization:"token"
    });
    return this.httpClient.post(APILink.personAPIURL + "/person/get/niclike/" + nic, "{}",headers);
  }
}
