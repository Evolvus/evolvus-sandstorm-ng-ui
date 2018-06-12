import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/module/material.module';
import { HttpClientModule } from '@angular/common/http';


//MaterialLibrary

import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { SaveApplicationEntityComponent } from './components/application-management/save-application-entity/save-application-entity.component';
import { ListApplicationsEntityComponent } from './components/application-management/list-applications-entity/list-applications-entity.component';
import { UpdateApplicationEntityComponent } from './components/application-management/update-application-entity/update-application-entity.component';

import 'hammerjs';

import { StarterHeaderComponent } from './common-component/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './common-component/starter-left-side/starter-left-side.component';
import { StarterFooterComponent } from './common-component/starter-footer/starter-footer.component';
import { SearchPipe } from './components/shared/search.pipe';



import { ListRolesEntityComponent } from './components/role-management/list-roles-entity/list-roles-entity.component';
import { StarterContentComponent } from './components/starter-content/starter-content.component';
import { AddRoleEntityComponent } from './components/role-management/add-role-entity/add-role-entity.component';
import { ViewRoleEntityComponent } from './components/role-management/view-role-entity/view-role-entity.component';
import { UpdateRoleEntityComponent } from './components/role-management/update-role-entity/update-role-entity.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';



import { ResponsiveService } from './components/shared/responsive.service';
import { RoleDataService } from './shared/role-data.service';
import { ViewApplicationEntityComponent } from './components/application-management/view-application-entity/view-application-entity.component';


@NgModule({
  declarations: [
    AppComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterFooterComponent,
    StarterContentComponent,
    ListRolesEntityComponent,
    AddRoleEntityComponent,
    ViewRoleEntityComponent,
    UpdateRoleEntityComponent,
    UserManagementComponent,
    AddUserComponent,
    ViewUserComponent,
    ListApplicationsEntityComponent,
    SaveApplicationEntityComponent,
    UpdateApplicationEntityComponent,
    SearchPipe,
    ViewApplicationEntityComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ResponsiveService, RoleDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
