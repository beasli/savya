import { AuthGuardService } from './components/auth-guard/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AccountModule } from './components/my-account/account/account.module';
import { AuthModule } from './components/auth/auth/auth.module';
import { LayoutModule } from './components/layout/layout/layout.module';
import { ShoppingModule } from './components/shopping/shopping/shopping.module';
import { SiteModule } from './components/site/site/site.module';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from './components/auth-guard/checkout.service';
import { OtpGuardService } from './components/auth-guard/otp-guard.service';
import { KycPendingComponent } from './components/auth/kyc-pending/kyc-pending.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    KycPendingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    AuthModule,
    LayoutModule,
    ShoppingModule,
    SiteModule,
    FormsModule,
    ReactiveFormsModule ,
    NgbModule,
  ],
  providers: [AuthGuardService,CheckoutService,OtpGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
