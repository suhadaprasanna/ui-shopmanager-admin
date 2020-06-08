import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/object/Object';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemCategoryService } from 'src/app/service/item-category.service';
import { Status, TransferData } from 'src/app/util/Util';
import { faPlus, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ItemCategoryAddComponent } from '../item-category-add/item-category-add.component';
import { TreeNode } from '../plugin/tree/tree-node-view/tree-node-view.component';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html'
})
export class ItemCategoryComponent implements OnInit {

  icon_faPlus = faPlus;
  icon_faAngleRight = faAngleRight;
  
  treeList:TreeNode[]=[];
  categoryList:Category[]=[];

  constructor(
    public dialog: MatDialog,
    private itemCategoryService: ItemCategoryService
  ) {}

  ngOnInit() {
    // this.categoryList = [
    //   {id:1,name:"A",status:"Y",code:"A",parent_category:0,sub_category:[]},
    //   {id:2,name:"B",status:"Y",code:"B",parent_category:0,
    //   sub_category:[
    //     {id:4,name:"B1",status:"Y",code:"B1",parent_category:2,sub_category:[]},
    //     {id:5,name:"B2",status:"Y",code:"B2",parent_category:2,
    //     sub_category:[
    //       {id:6,name:"B21",status:"Y",code:"B21",parent_category:5,sub_category:[]},
    //     ]},
    //   ]},
    //   {id:3,name:"C",status:"Y",code:"C",parent_category:0,
    //   sub_category:[
    //     {id:7,name:"C1",status:"Y",code:"C1",parent_category:3,
    //     sub_category:[
    //       {id:8,name:"C11",status:"Y",code:"C11",parent_category:7,sub_category:[]},
    //       {id:9,name:"C12",status:"Y",code:"C12",parent_category:7,sub_category:[]},
    //     ]},
    //   ]},
    // ]
    this.getCategories(0);
    this.treeList=this.createTreeList(this.categoryList,0,null);
  }

  getCategories(id){
    this.itemCategoryService.getCategories(id).subscribe((res:TransferData)=>{
      if(res.status != undefined && res.status==Status.success){
        this.categoryList = res.outputs["list"];
      }else{

      }
    });
  }

  addCategory(parent_category){
    let dialogRef = this.dialog.open(ItemCategoryAddComponent, {
      height: '350px',
      width: '300px',
      data:{
        parent_category:parent_category
      }
    });
    dialogRef.afterClosed().subscribe(
      res=>{
        console.log(res);
      });
  }

  categoryEnableDisable(event,category){
    console.log(category)
    console.log(event)
    if(event.target.checked == true){
      category.status = "Y";
    }else{
      category.status = "N";
    }
  }

  createTreeList(list:any[],level:number,parent:any){
    if(level<=0)
      level =1;
    let treelist:TreeNode[] = [];
    list.forEach(element => {
      let ele:Category = element;
      let node = new TreeNode();
      node.level = level;
      node.object = ele;
      node.name = ele.name;
      node.status = ele.status;
      // set parent's ID
      if(parent != null){
        node.parentId = parent.id;
      }
      // checking sub objects
      if(ele.sub_category != null && ele.sub_category.length>0){
        node.hasChildren = true;
        treelist.push(node);
        treelist = treelist.concat(this.createTreeList(ele.sub_category,(level+1),ele));
      }else{
        treelist.push(node);
      }
    });
    return treelist;
  }

}
