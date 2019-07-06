import { FairShowComponent } from './fair-show/fair-show.component';
import { FairListComponent } from './fair-list/fair-list.component';
import { HomeComponent } from './home/home.component';
import { AdditionalEditComponent } from './additional-edit/additional-edit.component';
import { AdditionalShowComponent } from './additional-show/additional-show.component';
import { AdditionalListComponent } from './additional-list/additional-list.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { AdditionalAddComponent } from './additional-add/additional-add.component';
import { StudentGuard } from './student.guard';
import { CompanyGuard } from './company.guard';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageShowComponent } from './package-show/package-show.component';
import { PackageAddComponent } from './package-add/package-add.component';
import { AdministratorGuard } from './administrator.guard';
import { SettingsComponent } from './settings/settings.component';
import { CurriculumVitaeShowComponent } from './curriculum-vitae-show/curriculum-vitae-show.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionAddComponent } from './competition-add/competition-add.component';
import { GuestSearchComponent } from './guest-search/guest-search.component';
import { CompetitionShowComponent } from './competition-show/competition-show.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { NotAuthGuard } from './not-auth.guard';
import { FairAddComponent } from './fair-add/fair-add.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"login",
    component: LoginComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path:"register",
    component: RegisterComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path:"change_password",
    component: ChangePasswordComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path:"student_search",
    component: StudentSearchComponent,
    canActivate:[AuthGuard, StudentGuard]
  },
  {
    path:"guest_search",
    component: GuestSearchComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path:"curriculum_vitae",
    component: CurriculumVitaeComponent,
    canActivate: [AuthGuard, StudentGuard]
  },
  {
    path:"curriculum_vitae/show/:id",
    component: CurriculumVitaeShowComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"companies/show/:id",
    component: CompanyShowComponent
  },
  {
    path: "competitions/list",
    component: CompetitionListComponent
  },
  {
    path: "competitions/add",
    component: CompetitionAddComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path:"competitions/show/:id",
    component: CompetitionShowComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"system_settings",
    component: SettingsComponent,
    canActivate: [AuthGuard, AdministratorGuard]
  },
  {
    path:"packages/list",
    component: PackageListComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path:"packages/add",
    component: PackageAddComponent,
    canActivate: [AuthGuard, AdministratorGuard]
  },
  {
    path:"packages/show/:id",
    component: PackageShowComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path:"packages/edit/:id",
    component: PackageEditComponent,
    canActivate: [AuthGuard, AdministratorGuard]
  },
  {
    path:"additionals/list",
    component: AdditionalListComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path:"additionals/add",
    component: AdditionalAddComponent,
    canActivate: [AuthGuard, AdministratorGuard]
  },
  {
    path:"additionals/show/:id",
    component: AdditionalShowComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path:"additionals/edit/:id",
    component: AdditionalEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"fairs/add",
    component: FairAddComponent,
    canActivate: [AuthGuard, AdministratorGuard]
  },
  {
    path:"fairs/list",
    component: FairListComponent,
    canActivate: [AuthGuard, CompanyGuard]
  },
  {
    path:"fairs/show/:id",
    component: FairShowComponent,
    canActivate: [AuthGuard, CompanyGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 

}