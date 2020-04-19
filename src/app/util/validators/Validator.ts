import { AbstractControl } from '@angular/forms';

export function StringValidator(control: AbstractControl) {
  if (control.value!=null && control.value.match(/\d+/g) != null && control.value.match(/\d+/g).length>0 ) {
    return { validString: true };
  }
  return null;
}

export function NumberValidator(control: AbstractControl) {
  if (control.value!=null && control.value.match(/^[0-9]\d*(\.\d+)?$/g) == null ) {
    return { validNumber: true };
  }
  return null;
}

export function PriceValidator(control: AbstractControl) {
  if (control.value!=null && control.value.match(/^\d+(,\d{3})*(\.\d{1,2})?$/g) == null ) {
    return { validPrice: true };
  }
  return null;
}

export function SelectedValidator(control: AbstractControl) {
  if (control.value==null ) {
    return { validSelected: true };
  }
  return null;
}

export function ContactNumberValidator(control: AbstractControl) {
  if (control.value!=null && control.value.match(/^[0-9]*$/g) == null ) {
    return { validContactNumber: true };
  }
  return null;
}
