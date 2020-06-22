import { ItemServiceService } from 'src/app/service/item-service.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Status } from '../Util';
import { map } from 'rxjs/operators';
import { ItemCategoryService } from 'src/app/service/item-category.service';
import { CategoryForm, ItemForm } from 'src/app/model/form/Form';

export const isItemCodeExist = (itemService: ItemServiceService) => {
    return (control: AbstractControl) => {
        let form = new ItemForm();
        form.code = control.value;
        return itemService.getItemByCode(form).pipe(
            map(
                (res) => {
                    if (itemService.item.id==0 && res["status"] == Status.success) {
                        if (res["outputs"]["item"] != null && res["outputs"]["item"] != undefined) {
                            return { isItemCodeExist: true }
                        }
                        return null;
                    }
                    return null;
                }
            )
        );
    }
}

export const isItemNameExist = (itemService: ItemServiceService) => {
    return (control: AbstractControl) => {
        let form = new ItemForm();
        form.name = control.value;
        return itemService.getItemByName(form).pipe(
            map(
                (res) => {
                    if (itemService.item.id==0 && res["status"] == Status.success) {
                        if (res["outputs"]["item"] != null && res["outputs"]["item"] != undefined) {
                            return { isItemNameExist: true }
                        }
                        return null;
                    }
                    return null;
                }
            )
        );
    }
}

export const isCategoryNameExist = (itemCategoryService: ItemCategoryService) => {
    return (control: AbstractControl) => {
        let form = new CategoryForm();
        form.name = control.value;
        return itemCategoryService.getCategoryByName(form).pipe(
            map(
                (res) => {
                    if (itemCategoryService.category.id==0 && res["status"] == Status.success) {
                        if (res["outputs"]["category"] != null && res["outputs"]["category"] != undefined) {
                            return { isCategoryNameExist: true }
                        }
                        return null;
                    }
                    return null;
                }
            )
        );
    }
}

export const isCategoryCodeExist = (itemCategoryService: ItemCategoryService) => {
    return (control: AbstractControl) => {
        let form = new CategoryForm();
        form.code = control.value;
        return itemCategoryService.getCategoryByCode(form).pipe(
            map(
                (res) => {
                    if (itemCategoryService.category.id==0 && res["status"] == Status.success) {
                        if (res["outputs"]["category"] != null && res["outputs"]["category"] != undefined) {
                            return { isCategoryCodeExist: true }
                        }
                        return null;
                    }
                    return null;
                }
            )
        );
    }
}