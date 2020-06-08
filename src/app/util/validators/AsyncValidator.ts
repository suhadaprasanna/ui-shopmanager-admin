import { ItemServiceService } from 'src/app/service/item-service.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Status } from '../Util';
import { map } from 'rxjs/operators';
import { ItemCategoryService } from 'src/app/service/item-category.service';

export const isItemCodeExist = (itemService: ItemServiceService) => {
    return (control: AbstractControl) => {
        return itemService.getItemByCode(control.value).pipe(
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
        return itemService.getItemByName(control.value).pipe(
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
        return itemCategoryService.getCategoryByName(control.value).pipe(
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
        return itemCategoryService.getCategoryByCode(control.value).pipe(
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