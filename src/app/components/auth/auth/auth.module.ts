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

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent, 
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
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'registerOtp/:no' , component: OtpComponent,canActivate: [OtpGuardService]},
      { path: 'forget' , component: ForgetPasswordComponent},
      { path: 'forgetOtp/:no' , component: ForgetOtpComponent},
      { path: 'change/:no' , component: ChangePasswordComponent, canActivate: [OtpGuardService]},
      { path: 'kyc' , component: KycComponent, canActivate: [AuthGuardService]},
      { path: 'changeProfile' , component: ChangeProfileComponent,  canActivate: [AuthGuardService]},
    ])
  ]
})
export class AuthModule { }
