export class RoleModel {
  roleName: string;
  description: string;
  applicationCategory: string;
  roleType: string;
  activationStatus: string;
  menuItems: Object[];

  constructor(
    roleName: string,
    description: string,
    applicationCategory: string,
    roleType: string,
    activationStatus: string,
    menuItems: Object[]
  ) {
    this.roleName = roleName;
    this.description = description;
    this.applicationCategory = applicationCategory;
    this.roleType = roleType;
    this.activationStatus = activationStatus;
    this.menuItems = menuItems;
  }

}

