import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/site/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AccountDetailsComponent } from './components/my-account/account-details/account-details.component';
import { AccountAddressesComponent } from './components/my-account/account-addresses/account-addresses.component';
import { AccountWishlistComponent } from './components/my-account/account-wishlist/account-wishlist.component';
import { AccountHistoryComponent } from './components/my-account/account-history/account-history.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CheckoutComponent } from './components/shopping/checkout/checkout.component';
import { CartComponent } from './components/shopping/cart/cart.component';
import { ProductComponent } from './components/shopping/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccountDetailsComponent,
    AccountAddressesComponent,
    AccountWishlistComponent,
    AccountHistoryComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
