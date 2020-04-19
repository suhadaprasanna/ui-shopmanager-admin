
export class ItemFilterForm {
    name:String;
    code:String;
    barcode:String;
    count:Number = 10;
    page:Number = 1;/** this is selected page */
    status:String ="ALL";
    page_count:Number=0;
    total_count:Number=0;

    next(){
        if((Number(this.page)+1) <= this.page_count){
            this.page = Number(this.page)+1;
            return true;
        }
        return false;
    }
    previous(){
        if((Number(this.page)-1) > 0){
            this.page = Number(this.page)-1;
            return true;
        }
        return false;
    }
    setPage(page:Number){
        this.page = page;
        return true;
    }
}

export class ShopFilterForm {
    shop_name:String;
    shop_code:String;
    status:String ="ALL";
    count:Number = 10;
    page:Number = 1;/** this is selected page */
    page_count:Number=0;
    total_count:Number=0;

    next(){
        if((Number(this.page)+1) <= this.page_count){
            this.page = Number(this.page)+1;
            return true;
        }
        return false;
    }
    previous(){
        if((Number(this.page)-1) > 0){
            this.page = Number(this.page)-1;
            return true;
        }
        return false;
    }
    setPage(page:Number){
        this.page = page;
        return true;
    }
}