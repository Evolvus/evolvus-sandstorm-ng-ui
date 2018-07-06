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
listOfTimeZones: Object[] = [];
listOfMasterCurrency: Object[]=[];
listOfEntities: EntityModel[]=[];
listOfRoles: RoleModel[]=[];

  email = new FormControl('', [Validators.required, Validators.email]);
  text = new FormControl('', [Validators.required]);
  number = new FormControl('', [Validators.required]);
  select = new FormControl('', [Validators.required]);



  cntryControl: FormControl = new FormControl();
  stateControl: FormControl = new FormControl();
  cityControl: FormControl = new FormControl();
  branchControl: FormControl = new FormControl();

  countries = ['India', 'USA', 'UK'];
  stateslist = ['AP', 'KA', 'TN'];
  citieslist = ['Pune', 'Bangalore', 'Chennai'];
  branchesList = ['MG Road', 'BTM', 'Jayanagar', 'Halsuru', 'JP Nagar', 'ITPL'];

  filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;

  ngOnInit() {

    

    this.filteredOptions = this.cntryControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filtercountries(val))
    );
    this.filteredOptions1 = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(val1 => this.filterstates(val1))
    );
    this.filteredOptions2 = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(val2 => this.filtercities(val2))
    );
    this.filteredOptions3 = this.branchControl.valueChanges.pipe(
      startWith(''),
      map(val3 => this.filterbranch(val3))
    );

this.listOfTimeZones = this.userDataService.getAllTimeZones();
// this.userDataService.getAllEntities().subscribe((response: any)=>{
//   this.listOfEntities = response.data;
//   console.log(response, "----------------------------------");
// });
// this.userDataService.getAllRoleData(0,1).subscribe((response: any)=>{
//   this.listOfRoles = response.data;
//   console.log(response, "=======================================");
// });
this.listOfTimeZones = this.userDataService.getAllTimeZones();
this.listOfMasterCurrency = this.userDataService.getAllMasterCurrency();
// this.userDataService.getAllRoleData(0,1).subscribe((response: any)=>{
//   this.listOfRoles = response.data;
//   console.log(response, "=======================================");
// });

  }

  filtercountries(val: string): string[] {
      return this.countries.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
    filterstates(val1: string): string[] {
      return this.stateslist.filter(option1 => option1.toLowerCase().indexOf(val1.toLowerCase()) === 0);
    }
    filtercities(val2: string): string[] {
      return this.citieslist.filter(option2 => option2.toLowerCase().indexOf(val2.toLowerCase()) === 0);
    }
    filterbranch(val3: string): string[] {
      return this.branchesList.filter(option3 => option3.toLowerCase().indexOf(val3.toLowerCase()) === 0);
    }
 
  constructor(private userDataService: UserDataService, private router: Router) {
    this.userForm = new FormGroup({
      userId : new FormControl(null, Validators.required),
      userName : new FormControl(null, [Validators.minLength(6), Validators.maxLength(35), Validators.required]),
      designation : new FormControl(null, Validators.required),
      role: new FormControl(null, [Validators.required]),
      entity: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNo: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      timeZone: new FormControl(null, [Validators.required]),
      individualTransactionLimit: new FormControl(null, [Validators.required]),
      dailyLimit: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),   
      faxNumber: new FormControl(null, [Validators.required]),
    });

   }

  save() {

var userData = {
userName: this.userForm.value.userName,
userId: this.userForm.value.userId,
designation: this.userForm.value.designation,
role: this.userForm.value.role,
entity: this.userForm.value.entity,
masterTimeZone: this.userForm.value.timeZone,
masterCurrency: this.userForm.value.currency,
contact: {
  phoneNo:  this.userForm.value.phoneNo,
  mobileNo:  this.userForm.value.mobileNo,
  faxNumber:  this.userForm.value.faxNumber,
  city: this.userForm.value.city,
  state: this.userForm.value.state,
  country: this.userForm.value.country,
  email: this.userForm.value.email
},
userPassword: "evolvus*123",
individualTransactionLimit: this.userForm.value.individualTransactionLimit,
dailyLimit: this.userForm.value.dailyLimit
};


    this.userDataService.save(userData).subscribe((response: {savedEntityObject: Object, description: string, status: string}) => {
      console.log("")
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
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter data' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getTxtErrorMessage() {
    return this.text.hasError('required') ? 'You must enter data' : '';
  }



}

