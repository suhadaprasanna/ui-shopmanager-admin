import { Component, OnInit, Input } from '@angular/core';

export class TreeNode {
  level:number;
  name:String;
  object:any;
  hasChildren:boolean;
  parentId:Number;
  isExpand:boolean;
  status:String;
  isSelected:boolean;
}

@Component({
  selector: 'app-tree-node-view',
  templateUrl: './tree-node-view.component.html',
})
export class TreeNodeViewComponent implements OnInit {

  @Input("node")node:TreeNode;

  padding_left:Number = 15;

  constructor() { }

  ngOnInit() {
    
  }

}
