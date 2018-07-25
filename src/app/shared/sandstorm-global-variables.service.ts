import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SandstormGlobalVariablesService implements OnInit{

  constructor() { }

  currentUser: any = {};
  
ngOnInit(){

}



}
