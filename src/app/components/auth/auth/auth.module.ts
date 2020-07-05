import { KycPendingComponent } from './../kyc-pending/kyc-pending.component';
import { AuthGuardService } from './../../auth-guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OtpComponent } from '../otp/otp.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { ForgetOtpComponent } from '../forget-otp/forget-otp.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { KycComponent } from '../kyc/kyc.component';
import { ChangeProfileComponent } from '../change-profile/change-profile.component';
import { OtpGuardService } from '../../auth-guard/otp-guard.service';
import { SiteModule } from '../../site/site/site.module';
import { LoginGuardService } from '../../auth-guard/login-guard.service';
import { KycDoneService } from '../../auth-guard/kyc-done.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    KycPendingComponent,
    ForgetPasswordComponent,
    ForgetOtpComponent,
    ChangePasswordComponent,
    KycComponent,
    ChangeProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule ,
    SiteModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent,canActivate: [LoginGuardService]},
      { path: 'register', component: RegisterComponent,canActivate: [LoginGuardService]},
      { path: 'registerOtp/:no' , component: OtpComponent,canActivate: [OtpGuardService]},
      { path: 'forget' , component: ForgetPasswordComponent},
      { path: 'forgetOtp/:no' , component: ForgetOtpComponent},
      { path: 'change/:no' , component: ChangePasswordComponent, canActivate: [OtpGuardService]},
      { path: 'kyc' , component: KycComponent, canActivate: [AuthGuardService]},
      { path: 'changeProfile' , component: ChangeProfileComponent,  canActivate: [AuthGuardService]},
      { path: 'kycpending' , component: KycPendingComponent, canActivate: [AuthGuardService]}
    ])
  ]
})
export class AuthModule { }
