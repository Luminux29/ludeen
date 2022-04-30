import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth-guard';

// COMPONENTS
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { SignupComponent } from './page/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './service/admin-guard';
import { FacultyDashboardComponent } from './page/faculty/faculty-dashboard/faculty-dashboard.component';
import { StudentGuard } from './service/student-guard';
import { FacultyGuard } from './service/faculty-guard';
import { AccountsComponent } from './page/admin/accounts/accounts.component';
import { AdminSettingsComponent } from './page/admin/admin-settings/admin-settings.component';
import { AdminRequestComponent } from './page/admin/admin-request/admin-request.component';
import { MyrequestComponent } from './user/myrequest/myrequest.component';
import { SubjectsComponent } from './page/admin/subjects/subjects.component';
import { FacultyRequestComponent } from './page/faculty/faculty-request/faculty-request.component'
import { ProfileInfoComponent } from './page/profile-info/profile-info.component';
import { FacultyProfileComponent } from './page/faculty/faculty-profile/faculty-profile.component'
import { ValidityRedirectComponent } from './page/faculty/validity-redirect/validity-redirect.component';
import { CardSchoolComponent } from './elements/card-school/card-school.component';
import { CardWorkComponent } from './elements/card-work/card-work.component';
import { CardTrainingComponent } from './elements/card-training/card-training.component';
import { CardCivilComponent } from './elements/card-civil/card-civil.component';
import { ReverseAuthGuard } from './service/reverse-auth-guard';
const routes: Routes = [


  {path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path : 'sign-in', component: SignInComponent, canActivate:[ReverseAuthGuard]},
  {path : 'sign-up', component: SignupComponent, canActivate:[ReverseAuthGuard]},
  
  
  
  {path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, StudentGuard]},
  {path : 'profile', component: ProfileComponent ,  canActivate: [AuthGuard]},
  {path : 'myrequest', component: MyrequestComponent ,  canActivate: [AuthGuard, StudentGuard]},
  
  //ADMIN GUARDS
  {path : 'admin-dashboard', component: AdminDashboardComponent,  canActivate: [AuthGuard, AdminGuard] },
  {path : 'accounts', component: AccountsComponent,  canActivate: [AuthGuard, AdminGuard] },
  {path : 'admin-request', component: AdminRequestComponent,  canActivate: [AuthGuard, AdminGuard] },
  {path : 'admin-settings', component: AdminSettingsComponent,  canActivate: [AuthGuard, AdminGuard] },
  {path : 'subject', component: SubjectsComponent ,  canActivate: [AuthGuard, AdminGuard]},
  
  //FACULTY GUARDS
  {path : 'faculty-dashboard', component: FacultyDashboardComponent,  canActivate: [AuthGuard, FacultyGuard] },
  {path : 'faculty-profile', component: FacultyProfileComponent,  canActivate: [AuthGuard, FacultyGuard] },
  {path : 'faculty-request', component: FacultyRequestComponent,  canActivate: [AuthGuard, FacultyGuard] },
  {path : 'validity-redirect', component: ValidityRedirectComponent,  canActivate: [AuthGuard] },



  //RAYMOND GUARDS
  {path : 'profile-info', component: ProfileInfoComponent, canActivate: [AuthGuard]},
  {path : 'school', component: CardSchoolComponent, canActivate: [AuthGuard]},
  {path : 'work', component: CardWorkComponent, canActivate: [AuthGuard]},
  {path : 'training', component: CardTrainingComponent, canActivate: [AuthGuard]},
  {path : 'civil', component: CardCivilComponent, canActivate: [AuthGuard]}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, ReverseAuthGuard, FacultyGuard, AdminGuard]
})
export class AppRoutingModule { }
