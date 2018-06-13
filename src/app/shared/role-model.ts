export class RoleModel {
  roleName: string;
  description: string;
  applicationCategory: string;
  roleType: string;
  activationStatus: string;
  processingStatus: string;
  associatedUsers: number;
  lastModifiedTime: Date;
  menuItems: Object[];

  constructor(
    roleName: string,
    description: string,
    applicationCategory: string,
    roleType: string,
    activationStatus: string,
    processingStatus: string,
    associatedUsers: number,
    lastModifiedTime: Date,
    menuItems: Object[]
  ) {
    this.roleName = roleName;
    this.description = description;
    this.applicationCategory = applicationCategory;
    this.roleType = roleType;
    this.activationStatus = activationStatus;
    this.processingStatus = processingStatus;
    this.associatedUsers = associatedUsers;
    this.lastModifiedTime = lastModifiedTime;
    this.menuItems = menuItems;
  }

}

