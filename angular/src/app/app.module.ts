import { MatStepperModule } from '@angular/material/stepper';
import { StudentSearchComponent } from './student-search/student-search.component';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CurriculumVitaeComponent } from './curriculum-vitae/curriculum-vitae.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CompetitionShowComponent } from './competition-show/competition-show.component';
import { GuestSearchComponent } from './guest-search/guest-search.component';
import { CompetitionAddComponent } from './competition-add/competition-add.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CurriculumVitaeShowComponent } from './curriculum-vitae-show/curriculum-vitae-show.component';
import { SettingsComponent } from './settings/settings.component';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageShowComponent } from './package-show/package-show.component';
import { PackageAddComponent } from './package-add/package-add.component';
import { AdditionalListComponent } from './additional-list/additional-list.component';
import { AdditionalShowComponent } from './additional-show/additional-show.component';
import { AdditionalAddComponent } from './additional-add/additional-add.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AdditionalEditComponent } from './additional-edit/additional-edit.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { FairAddComponent } from './fair-add/fair-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatIcon, MatIconModule } from '@angular/material';
import { FairListComponent } from './fair-list/fair-list.component';
import { HomeComponent } from './home/home.component';
import { FairShowComponent } from './fair-show/fair-show.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    StudentSearchComponent,
    ChangePasswordComponent,
    CurriculumVitaeComponent,
    CompanyShowComponent,
    CompetitionShowComponent,
    GuestSearchComponent,
    CompetitionAddComponent,
    CompetitionListComponent,
    CurriculumVitaeShowComponent,
    SettingsComponent,
    PackageListComponent,
    PackageShowComponent,
    PackageAddComponent,
    AdditionalListComponent,
    AdditionalShowComponent,
    AdditionalAddComponent,
    AdditionalEditComponent,
    PackageEditComponent,
    FairAddComponent,
    FairListComponent,
    HomeComponent,
    FairShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [AuthService, CurriculumVitaeService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
