import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router/src/config';
import { StarterContentComponent } from '../components/starter-content/starter-content.component';
import { RoleManagementComponent } from '../components/role-management/role-management.component';
import { AddRoleComponent } from '../components/add-role/add-role.component';
import { ViewRoleComponent } from '../components/view-role/view-role.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { SaveApplicationEntityComponent } from '../components/application-management/save-application-entity/save-application-entity.component';
import { ListApplicationsEntityComponent } from '../components/application-management/list-applications-entity/list-applications-entity.component';
import { ViewUpdateApplicationEntityComponent } from '../components/application-management/view-update-application-entity/view-update-application-entity.component';



const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: StarterContentComponent},
  { path: 'applicationManagement', component: ListApplicationsEntityComponent },
  { path: 'createApplication', component: SaveApplicationEntityComponent },
  { path: 'viewApplication/:id', component: ViewUpdateApplicationEntityComponent },
  { path: 'rolemanagement', component: RoleManagementComponent },
  { path: 'addrole', component: AddRoleComponent },
  { path: 'viewrole', component: ViewRoleComponent },
  { path: 'usermanagement', component: UserManagementComponent },
   { path: 'adduser', component: AddUserComponent },
   { path: 'viewuser', component: ViewUserComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
