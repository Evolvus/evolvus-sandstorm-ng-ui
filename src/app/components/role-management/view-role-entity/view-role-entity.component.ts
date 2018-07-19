import { RoleModel } from './../role-model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleDataService } from '../role-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-view-role-entity',
  templateUrl: './view-role-entity.component.html',
  styleUrls: ['./view-role-entity.component.css']
})
export class ViewRoleEntityComponent implements OnInit {
  
  selectedRole: any;
  isStatusPending: boolean = true;
  user: any;
  roleType: any;
  constructor(private router: Router, private route: ActivatedRoute, private roleDataService: RoleDataService) { }
 
  ngOnInit() {

    var roleName = this.route.snapshot.params['id'];
    this.roleDataService.getOneRoleData(roleName)
     .subscribe((response: any)=>{
       if(response.data.length != 0){
      this.selectedRole = response.data[0];
      if(this.selectedRole.processingStatus!='PENDING_AUTHORIZATION'){
        this.isStatusPending = false;
          }else{
            this.isStatusPending = true;
          }
       }
   });


  


  }


deleteRole(){

this.roleDataService.openDialog(
  "alert",
  "Are you sure you want to delete "+this.selectedRole.roleName+" Role?"
).subscribe((result)=>{
  if(result==true){
    this.roleDataService.deleteRole(this.selectedRole)
    .subscribe((response)=>{
      this.roleDataService.openDialog(
        "success",
        this.selectedRole.roleName + "\xa0Role Deleted Successfully!"
      );
    }, (err)=>{
      this.roleDataService.openDialog(
        "error",
       "Error occurred while deleting role. Please try again!"
      );
    });  
  }
})


}

updateRole()
{
  if(!this.isStatusPending){
    this.router.navigate(['updateRole', this.selectedRole.roleName] );
  }
  
  }


abortViewAction(){

  this.router.navigate(['roleManagement']);


}
}
