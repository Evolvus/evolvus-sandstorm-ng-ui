import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
userForm: FormGroup;

  
  

  email = new FormControl('', [Validators.required, Validators.email]);
  text = new FormControl('', [Validators.required]);
  number = new FormControl('', [Validators.required]);
  select = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter data' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getTxtErrorMessage() {
    return this.text.hasError('required') ? 'You must enter data' : '';
  }

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

    this.userForm = new FormGroup({
      userId : new FormControl(null, Validators.required),
      userName : new FormControl(null, [Validators.minLength(6), Validators.maxLength(35), Validators.required]),
      designation : new FormControl(null, Validators.required),
      role: new FormControl(null, [Validators.required]),
      entity: new FormControl(null, [Validators.required]),
      emailId: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{0-10}")]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{0-10}")]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      timeZone: new FormControl(null, [Validators.required]),
      branch: new FormControl(null, [Validators.required]),
      individualTransactionLimit: new FormControl(null, [Validators.required]),
      dailyLimit: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required]),   
      fax: new FormControl(null, [Validators.required]),
    });


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
 
  constructor() { }

  save(){
    
  }
  

}

