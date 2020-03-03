import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { AccountAddressesComponent } from '../account-addresses/account-addresses.component';
import { AccountWishlistComponent } from '../account-wishlist/account-wishlist.component';
import { AccountHistoryComponent } from '../account-history/account-history.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../../auth-guard/auth-guard.service';



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
      { path: 'account-details', component: AccountDetailsComponent,  canActivate: [AuthGuardService]},
      { path: 'account-addresses', component: AccountAddressesComponent,  canActivate: [AuthGuardService]},
      { path: 'account-wishlist', component: AccountWishlistComponent,  canActivate: [AuthGuardService]},
      { path: 'account-history', component: AccountHistoryComponent,  canActivate: [AuthGuardService]},
    ])
  ]
})
export class AccountModule { }
