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
import { ProfileInfoComponent } from './elements/profile-info/profile-info.component';
import { FacultyProfileComponent } from './page/faculty/faculty-profile/faculty-profile.component'
import { ValidityRedirectComponent } from './page/faculty/validity-redirect/validity-redirect.component';
import { CardSchoolComponent } from './elements/card-school/card-school.component';
import { CardWorkComponent } from './elements/card-work/card-work.component';
import { CardTrainingComponent } from './elements/card-training/card-training.component';
import { CardCivilComponent } from './elements/card-civil/card-civil.component';
import { ReverseAuthGuard } from './service/reverse-auth-guard';
import { PdfviewerComponent } from './elements/pdfviewer/pdfviewer.component';
import { CreateAdminComponent } from './page/create-admin/create-admin.component';
import { AboutComponent } from './page/about/about.component';
import { AdminAboutComponent } from './page/admin-about/admin-about.component';
const routes: Routes = [


  {path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path : 'sign-in', component: SignInComponent, canActivate:[ReverseAuthGuard]},
  {path : 'sign-up', component: SignupComponent, canActivate:[ReverseAuthGuard]},
  
  
  
  {path : 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, StudentGuard]},
  {path : 'profile', component: ProfileComponent ,  canActivate: [AuthGuard]},
  {path : 'myrequest', component: MyrequestComponent ,  canActivate: [AuthGuard, StudentGuard]},
  
  //ADMIN GUARDS
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
  {path : 'profile-info', component: ProfileInfoComponent, canActivate: [AuthGuard, FacultyGuard]},
  {path : 'school', component: CardSchoolComponent, canActivate: [AuthGuard, FacultyGuard]},
  {path : 'work', component: CardWorkComponent, canActivate: [AuthGuard, FacultyGuard]},
  {path : 'training', component: CardTrainingComponent, canActivate: [AuthGuard, FacultyGuard]},
  {path : 'civil', component: CardCivilComponent, canActivate: [AuthGuard, FacultyGuard]},
  {path : 'admin-dashboard', component: AdminDashboardComponent,  canActivate: [AuthGuard, AdminGuard]},
  {path : 'create-admin', component: CreateAdminComponent,  canActivate: [ReverseAuthGuard]},
  {path : 'about', component: AboutComponent, canActivate: [AuthGuard, FacultyGuard]},
  
  {path : 'admin-about', component: AdminAboutComponent, canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, ReverseAuthGuard, FacultyGuard, AdminGuard]
})
export class AppRoutingModule { }
