import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { AccountAddressesComponent } from '../account-addresses/account-addresses.component';
import { AccountWishlistComponent } from '../account-wishlist/account-wishlist.component';
import { AccountHistoryComponent } from '../account-history/account-history.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountAddressesComponent,
    AccountWishlistComponent,
    AccountHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'account-details', component: AccountDetailsComponent},
      { path: 'account-addresses', component: AccountAddressesComponent},
      { path: 'account-wishlist', component: AccountWishlistComponent},
      { path: 'account-history', component: AccountHistoryComponent},
    ])
  ]
})
export class AccountModule { }
