import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth-guard';

// COMPONENTS

import { SignInComponent } from './page/sign-in/sign-in.component';
import { SignupComponent } from './page/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';

import { StudentGuard } from './service/student-guard';

import { ProfileInfoComponent } from './elements/profile-info/profile-info.component';

import { ReverseAuthGuard } from './service/reverse-auth-guard';

const routes: Routes = [


  {path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {path : 'sign-in', component: SignInComponent, canActivate:[ReverseAuthGuard]},
  {path : 'sign-up', component: SignupComponent, canActivate:[ReverseAuthGuard]},
  {path : 'profile', component: ProfileComponent ,  canActivate: [AuthGuard]},
  {path : 'profile-info', component: ProfileInfoComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, ReverseAuthGuard]
})
export class AppRoutingModule { }
