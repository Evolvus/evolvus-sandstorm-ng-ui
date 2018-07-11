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

    

    // this.filteredOptions = this.cntryControl.valueChanges.pipe(
    //   startWith(''),
    //   map(val => this.filtercountries(val))
    // );
    // this.filteredOptions1 = this.stateControl.valueChanges.pipe(
    //   startWith(''),
    //   map(val1 => this.filterstates(val1))
    // );
    // this.filteredEntityNames = this.userForm.controls.entity.valueChanges.pipe(
    //   startWith(''),
    //   map(val2 => this.filtercities(val2))
    // );
    // this.filteredOptions3 = this.branchControl.valueChanges.pipe(
    //   startWith(''),
    //   map(val3 => this.filterbranch(val3))
    // );

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
  for(let role of this.listOfRoles){
    this.listOfRoleNames.push(role.roleName);
  }
  this.getFilteredRoleNames();

});



  }

  // filtercountries(val: string): string[] {
  //     return this.countries.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  //   }
  //   filterstates(val1: string): string[] {
  //     return this.stateslist.filter(option1 => option1.toLowerCase().indexOf(val1.toLowerCase()) === 0);
  //   }
  //   filtercities(val2: string): string[] {
  //     return this.citieslist.filter(option2 => option2.toLowerCase().indexOf(val2.toLowerCase()) === 0);
  //   }
  //   filterbranch(val3: string): string[] {
  //     return this.branchesList.filter(option3 => option3.toLowerCase().indexOf(val3.toLowerCase()) === 0);
  //   }
 
  constructor(private userDataService: UserDataService, private router: Router) {
    this.userForm = new FormGroup({
      userId : new FormControl("", Validators.required),
      userName : new FormControl("", [Validators.minLength(6), Validators.maxLength(35), Validators.required]),
      designation : new FormControl(""),
      role: new FormControl("", [Validators.required]),
      entity: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl(""),
      mobileNumber: new FormControl(""),
      country: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      // timeZone: new FormControl("", [Validators.required]),
      individualTransactionLimit: new FormControl("", [Validators.required]),
      dailyLimit: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required]),   
      faxNumber: new FormControl(""),
    });

   }

  save() {


var selectedRole = this.listOfRoles.filter(role => role.roleName == this.userForm.controls.role.value);
var selectedEntity = this.listOfEntities.filter(entity => entity.name == this.userForm.controls.entity.value);
var selectedMasterCurrency = this.listOfMasterCurrency.filter(masterCurrency => masterCurrency.currencyName == this.userForm.controls.currency.value);

var userData = {
userName: this.userForm.value.userName,
userId: this.userForm.value.userId,
designation: this.userForm.value.designation,
role: selectedRole[0],
entityId: selectedEntity[0].entityId,
// masterTimeZone: this.userForm.value.timeZone,
masterCurrency: this.userForm.value.currency,
contact: {
  phoneNumber:  this.userForm.value.phoneNumber,
  mobileNumber:  this.userForm.value.mobileNumber,
  faxNumber:  this.userForm.value.faxNumber,
  city: this.userForm.value.city,
  state: this.userForm.value.state,
  country: this.userForm.value.country,
  emailId: this.userForm.value.emailId
},
userPassword: "evolvus*123",
individualTransactionLimit: this.userForm.value.individualTransactionLimit,
dailyLimit: this.userForm.value.dailyLimit
};


    this.userDataService.save(userData).subscribe((response: {savedEntityObject: Object, description: string, status: string}) => {
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

