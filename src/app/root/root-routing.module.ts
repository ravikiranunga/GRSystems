import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetComponent } from './auth/reset/reset.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { HelpComponent } from './config/help/help.component';
import { ReportsComponent } from './config/reports/reports.component';
import { SettingsComponent } from './config/settings/settings.component';
import { AdminDashComponent } from './dash/admin-dash/admin-dash.component';
import { SadminDashComponent } from './dash/sadmin-dash/sadmin-dash.component';
import { LayoutComponent } from './layout/layout.component';
import { TicketDetailComponent } from './ticket/ticket-detail/ticket-detail.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { UsersListComponent } from './user/users-list/users-list.component';

const routes: Routes =
[
  {
    path: '', component: LayoutComponent,
    children:
    [
      { path: 'root/signin', component: SigninComponent },
      { path: 'root/admindashboard', component: AdminDashComponent },
      { path: 'root/sadmindashboard', component: SadminDashComponent },
      { path: 'root/tickets', component: TicketListComponent },
      { path: 'root/ticketdetail', component: TicketDetailComponent },
      { path: 'root/categories', component: CategoryListComponent },
      { path: 'root/reports', component: ReportsComponent },
      { path: 'root/users', component: UsersListComponent },
      { path: 'root/settings', component: SettingsComponent },
      { path: 'root/help', component: HelpComponent },
      { path: '', redirectTo: 'root/signin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
