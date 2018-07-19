import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SandstormGlobalVariablesService {

  constructor() { }

  currentUser: any = {};
  
}
// export const SandstormGlobalVariablesService = {
// currentUserData: this.currentUser
// };
