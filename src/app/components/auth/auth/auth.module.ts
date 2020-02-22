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


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent, 
    ForgetPasswordComponent,
    ForgetOtpComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'registerOtp/:no' , component: OtpComponent},
      { path: 'forget' , component: ForgetPasswordComponent},
      { path: 'forgetOtp/:no' , component: ForgetOtpComponent},
      { path: 'change/:no' , component: ChangePasswordComponent},
    ])
  ]
})
export class AuthModule { }
