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
import { UpdateApplicationEntityComponent } from '../components/application-management/update-application-entity/update-application-entity.component';
import { ViewApplicationEntityComponent } from '../components/application-management/view-application-entity/view-application-entity.component';



const routes: Routes =[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: StarterContentComponent},
  { path: 'applicationManagement', component: ListApplicationsEntityComponent },
  { path: 'createApplication', component: SaveApplicationEntityComponent },
  { path: 'viewApplication/:id', component: ViewApplicationEntityComponent },
  { path: 'updateApplication/:id', component: UpdateApplicationEntityComponent },
  { path: 'roleManagement', component: RoleManagementComponent },
  { path: 'addRole', component: AddRoleComponent },
  { path: 'viewRole', component: ViewRoleComponent },
  { path: 'userManagement', component: UserManagementComponent },
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
