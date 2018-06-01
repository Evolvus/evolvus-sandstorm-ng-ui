import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  tableHeader:any = [];

  constructor() { }

  ngOnInit() {
    this.tableHeader = ['Role Name','Role Description','Application Category','Enable/Disable','Status','Last Action on User','Last Modified Date Time'];
  }

  getSplitWord = function(item){
   var item1 = [];
   var item2 = [];
       
     var res = item.split(" ");
     for(var i = 0; i <= 1; i++){
         item1.push(res[i]);
     }

     for(var i = 2; i <= res.length; i++){
        item2.push(res[i]);
     }	          
 };
 
}
