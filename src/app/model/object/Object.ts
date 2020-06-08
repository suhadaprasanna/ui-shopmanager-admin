export class Person {
    id:Number;
    first_name:String;
    last_name:String;
    middle_name:String;
    sur_name:String;
    nic:String;
    gender:String;
    email:String;
    emails:PersonEmail[];
    contact1:String;
    contact2:String;
    contacts:PersonContact[];
    birth_day:Date = null;
    addressl1:String;
	addressl2:String;
	addressl3:String;
    addressl4:String;
    addresses:PersonAddress[];
	status:String ="Y";
}

export class PersonAddress {
    id:Number;
    addressl1:String;
    addressl2:String;
    addressl3:String;
    addressl4:String;
    sys_add_date:Date;
	status:String ="Y";
}

export class PersonContact {
    id:Number;
    number:String;
    sys_add_date:Date;
	status:String ="Y";
}

export class PersonEmail {
    id:Number;
    email:String;
    sys_add_date:Date;
	status:String="Y";
}

export class Shop {
    id:Number;
    shop_name:String;
    shop_code:String;
    email:String;
    emails = [];
    contact1:String;
    contact2:String;
    contacts = [];
    shop_register_number:String;
	status:String="Y";
	addressl1:String;
	addressl2:String;
    addressl3:String;
    addresses = [];
    shop_register_date:Date;
    person_id:Number;
    user_id:Number;
    user:User
}

export class ShopContact {
    id:Number;
    contact:String;
    sys_add_date:Date;
    status:String="Y";
    shop:Shop;
    shop_id:Number;
}

export class ShopEmail {
    id:Number;
    email:String;
    sys_add_date:Date;
    status:String="Y";
    shop:Shop;
    shop_id:Number;
}

export class ShopEmployee {
    id:Number;
    status:String="Y";
    user_id:Number;
    user:User;
    shop_id:Number;
    shop:Shop;
    sys_add_date:Date;
    register_date:Date;
    username:String;
    password:String;
    person:Person;
    employee_role_id:Number;
    employee_role:EmployeeRole;
}

export class User {
    id:Number;
    status:String="Y";
    person_id:Number;
    person:Person;
    created_date:Date;
}

export class EmployeeRole {
    id:Number;
    role_code:String;
    role_name:String;
    status:String="Y";
}

export class Login {
    username:String;
    password:String;
    status:String="Y";
}

export class Item {
    id:Number;
    name:String;
    code:String;
    barcode:String;
    status:String;
    image_path:String;
    image_paths:String[];
    image_file:File;
    sys_add_date:Date;
}

export class ItemImage {
    id:Number;
    image_name:String;
    priority:Number;
    status:String;
    item:Item;
}
export class Category {
    id:Number;
    name:String;
    code:String;
    parent_category:Number=-1;
    sub_category:Category[];
    status:String="Y";
}

export class ItemCategory {
    id:Number;
    category:Category;
    item:Item;
    status:String;
}