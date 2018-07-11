import { RoleModel } from './../../role-management/role-model';
import { EntityModel } from './../../entity-management/entity.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserDataService } from './../user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
userForm: FormGroup;
// listOfTimeZones: Object[] = [];
listOfMasterCurrency: any[]=[];







  filteredEntityNames: Observable<string[]>;  
  listOfEntityNames: string[]=[];
  listOfEntities: any;

  filteredRoleNames: Observable<string[]>;
  listOfRoleNames: string[]=[];
  listOfRoles: any;



  ngOnInit() {

    

//  this.userDataService.getAllTimeZones().subscribe((response: any)=>{
//    console.log(response, "getAllTimeZones");
// this.listOfTimeZones = response.data;
// });
this.userDataService.getAllMasterCurrency().subscribe((response: any)=>{
  console.log(response, "masterCurrency");
  this.listOfMasterCurrency = response.data;
  });
this.userDataService.getAllEntities().subscribe((response: any)=>{
  this.listOfEntities = response.data;
  for(let entity of this.listOfEntities){
    this.listOfEntityNames.push(entity.name);
  }
  this.getFilteredEntityNames();
});
this.userDataService.getAllRoleData(0,1).subscribe((response: any)=>{
  this.listOfRoles = response.data;
  console.log(" this.listOfRoles",  response);
  for(let role of this.listOfRoles){
    this.listOfRoleNames.push(role.roleName);
  }
  this.getFilteredRoleNames();

});



  }

  constructor(private userDataService: UserDataService, private router: Router) {
    this.userForm = new FormGroup({
      userId : new FormControl("", [Validators.required, Validators.minLength(6), Validators.minLength(35)]),
      userName : new FormControl("", [Validators.minLength(6), Validators.maxLength(140), Validators.required]),
      designation : new FormControl("", [Validators.maxLength(140)]),
      role: new FormControl("", [Validators.required]),
      entity: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", Validators.pattern("[0-9]{10}")),
      mobileNumber: new FormControl(""),
      country: new FormControl("", [Validators.required, Validators.maxLength(140)]),
      state: new FormControl("", [Validators.required, Validators.maxLength(140)]),
      city: new FormControl("", [Validators.required, Validators.maxLength(140)]),
      // timeZone: new FormControl("", [Validators.required]),
      individualTransactionLimit: new FormControl("", [Validators.required]),
      dailyLimit: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required]),   
      faxNumber: new FormControl("")
    });

   }

  save() {

    this.userDataService.save(this.userForm, this.listOfRoles, this.listOfEntities, this.listOfMasterCurrency).subscribe((response: {savedEntityObject: Object, description: string, status: string}) => {
      this.userDataService.openDialog(
         "success",
         response.description
       ).subscribe((result)=>{
       this.router.navigate(['userManagement']);
       
       });
  
     }, (err)=>{
      this.userDataService.openDialog(
        "error",
       err.error.message+"."
      ).subscribe((result)=>{
        console.log(err, "errrroooor");

      });
    });
  }





  getFilteredEntityNames(){
    this.filteredEntityNames = this.userForm.controls.entity.valueChanges
    .pipe(
      startWith(''),
      map(entityName => entityName ? this.filterEntities(entityName) : this.listOfEntityNames.slice())
    );
  }

 
  getFilteredRoleNames(){
    this.filteredRoleNames = this.userForm.controls.role.valueChanges
    .pipe(
      startWith(''),
      map(roleName => roleName ? this.filterRoles(roleName) : this.listOfRoleNames.slice())
    );
  }

  private filterEntities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOfEntityNames.filter(entityName => entityName.toLowerCase().indexOf(filterValue) === 0);
  }
  
  private filterRoles(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOfRoleNames.filter(roleName => roleName.toLowerCase().indexOf(filterValue) === 0);
  }
}

