export class RoleModel {

  name: string;
  description: string;
  applicationCategory: string;
  roleType: string;
  activationStatus: string;
  processingStatus: string;
  associatedUsers: number;
  lastModifiedTime: Date;

  constructor(name: string, description: string, applicationCategory: string, roleType: string,
    activationStatus: string,processingStatus: string, associatedUsers: number, lastModifiedTime: Date){

this.name = name;
this.description = description;
this.applicationCategory = applicationCategory;
this.roleType = roleType;
this.activationStatus = activationStatus;
this.processingStatus = processingStatus;
this.associatedUsers = associatedUsers;
this.lastModifiedTime = lastModifiedTime;
    }
}
