import { RoleModel } from './../role-model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { RoleDataService } from '../role-data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-view-role-entity',
  templateUrl: './view-role-entity.component.html',
  styleUrls: ['./view-role-entity.component.css']
})
export class ViewRoleEntityComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private roleDataService: RoleDataService) { }
  platformURL = environment.platformURL;
  roleData: any;
  ngOnInit() {
   
    var roleName = this.route.snapshot.params['id'];
    this.roleDataService.getOneRoleData(roleName)
     .subscribe((response)=>{
      this.roleData = response;
      
   });


  


  }


deleteRole(){

this.roleDataService.openDialog(
  "alert",
  "Are you sure you want to delete "+this.roleData.roleName+" Role?"
).subscribe((result)=>{
  if(result==true){
    this.roleDataService.deleteRole(this.roleData)
    .subscribe((response)=>{
      this.roleDataService.openDialog(
        "success",
        this.roleData.roleName + "\xa0Role Deleted Successfully!"
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
this.router.navigate(['updateRole', this.roleData.roleName] );
}
abortViewAction(){

  this.router.navigate(['roleManagement']);


}
}
