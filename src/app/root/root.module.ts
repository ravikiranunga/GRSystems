import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { RootRoutingModule } from './root-routing.module';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetComponent } from './auth/reset/reset.component';
import { AdminDashComponent } from './dash/admin-dash/admin-dash.component';
import { SadminDashComponent } from './dash/sadmin-dash/sadmin-dash.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { TicketNewComponent } from './ticket/ticket-new/ticket-new.component';
import { TicketDetailComponent } from './ticket/ticket-detail/ticket-detail.component';
import { CategoryNewComponent } from './category/category-new/category-new.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { SettingsComponent } from './config/settings/settings.component';
import { ReportsComponent } from './config/reports/reports.component';
import { HelpComponent } from './config/help/help.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UsersNewComponent } from './user/users-new/users-new.component';
import { DatepickerPopupComponent } from './shared/datepicker-popup/datepicker-popup.component';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { TicketEditComponent } from './ticket/ticket-edit/ticket-edit.component';
import { UsersEditComponent } from './user/users-edit/users-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ResetComponent,
    AdminDashComponent,
    SadminDashComponent,
    TicketListComponent,
    TicketNewComponent,
    TicketDetailComponent,
    CategoryNewComponent,
    CategoryListComponent,
    SettingsComponent,
    ReportsComponent,
    HelpComponent,
    LayoutComponent,
    SidebarComponent,
    UsersListComponent,
    UsersNewComponent,
    DatepickerPopupComponent,
    DatePickerComponent,
    TicketEditComponent,
    UsersEditComponent,
    UserProfileComponent,
    
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    RootRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgbDatepickerModule,
    Ng2SearchPipeModule
  ]
})
export class RootModule { }
