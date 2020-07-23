import { SeoService } from './components/SEO/seo.service';
import { SlugPipe } from './components/site/slug.pipe';
import { SiteModule } from './components/site/site/site.module';
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
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from './components/auth-guard/checkout.service';
import { OtpGuardService } from './components/auth-guard/otp-guard.service';
import { KycguardService } from './components/auth-guard/kycguard.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoginGuardService } from './components/auth-guard/login-guard.service';
import { KycDoneService } from './components/auth-guard/kyc-done.service';
import { ModalComponent } from './components/layout/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterComponent } from './components/layout/search-filter/search-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    ModalComponent,
    SearchFilterComponent,
  //  SlugPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    
    AppRoutingModule,
    AccountModule,
    AuthModule,
    LayoutModule,
    ShoppingModule,
    SiteModule,
    FormsModule,
    ReactiveFormsModule ,
    NgbModule,
    SimpleNotificationsModule.forRoot({
      position:["middle","center"],
       timeOut: 3000,
       showProgressBar: true,
       pauseOnHover: true,
       clickToClose: true
     }),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuardService,CheckoutService,OtpGuardService,KycguardService
    ,LoginGuardService,KycDoneService,SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
