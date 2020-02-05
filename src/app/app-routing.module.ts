import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/site/home/home.component';
import { AccountDetailsComponent } from './components/my-account/account-details/account-details.component';
import { AccountAddressesComponent } from './components/my-account/account-addresses/account-addresses.component';
import { AccountWishlistComponent } from './components/my-account/account-wishlist/account-wishlist.component';
import { AccountHistoryComponent } from './components/my-account/account-history/account-history.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CheckoutComponent } from './components/shopping/checkout/checkout.component';
import { CartComponent } from './components/shopping/cart/cart.component';
import { ProductComponent } from './components/shopping/product/product.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'account-details', component: AccountDetailsComponent},
  { path: 'account-addresses', component: AccountAddressesComponent},
  { path: 'account-wishlist', component: AccountWishlistComponent},
  { path: 'account-history', component: AccountHistoryComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'cart', component: CartComponent},
  { path: 'product', component: ProductComponent},
  { path: '',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
