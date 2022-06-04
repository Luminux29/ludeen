import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignInComponent } from './page/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './page/dashboard/dashboard.component';

import { SignupComponent } from './page/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthInterceptor } from './service/auth-interceptor';
import { AdminDashboardComponent } from './page/admin/admin-dashboard/admin-dashboard.component';
import { AccountsComponent} from './page/admin/accounts/accounts.component';
import { AdminRequestComponent } from './page/admin/admin-request/admin-request.component';
import { AdminSettingsComponent } from './page/admin/admin-settings/admin-settings.component';
import { SubjectsComponent } from './page/admin/subjects/subjects.component';

import { AddAccountComponent } from './elements/add-account/add-account.component';
import { AccountCardComponent } from './elements/account-card/account-card.component';
import { ProfileInfoComponent } from './elements/profile-info/profile-info.component';

import { SideNavComponent } from './elements/side-nav/side-nav.component';
import { PersonalInfoComponent } from './elements/personal-info/personal-info.component';
import { AboutComponent } from './page/about/about.component';
import { AdminAboutComponent } from './page/admin-about/admin-about.component';
import { DialogEditAboutComponent } from './elements/dialog-edit-about/dialog-edit-about.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    SignupComponent,
    ProfileComponent,
    AdminDashboardComponent,
    AccountsComponent,
    AdminRequestComponent,
    AdminSettingsComponent,
    SubjectsComponent,
    AddAccountComponent,
    AccountCardComponent,
    ProfileInfoComponent,
    SideNavComponent,
    PersonalInfoComponent,
    AboutComponent,
    AdminAboutComponent,
    DialogEditAboutComponent
  ],
  imports: [
    MatSidenavModule,
    MatDatepickerModule,
    MatDividerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    FormsModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,



  ],
  providers: [{provide: HTTP_INTERCEPTORS , useClass : AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
