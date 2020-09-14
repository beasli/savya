import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { SiteModule } from '../../site/site/site.module';
import { AuthGuardService } from '../../auth-guard/auth-guard.service';
import { CheckoutService } from '../../auth-guard/checkout.service';
import { AccountAddressesComponent } from '../../my-account/account-addresses/account-addresses.component';
import { AccountDetailsComponent } from '../../my-account/account-details/account-details.component';
import { AccountHistoryComponent } from '../../my-account/account-history/account-history.component';
import { AccountWishlistComponent } from '../../my-account/account-wishlist/account-wishlist.component';
import { EditAddressComponent } from '../../my-account/edit-address/edit-address.component';
import { EventHistoryComponent } from '../../my-account/event-history/event-history.component';
import { OffersComponent } from '../../my-account/offers/offers.component';
import { OrderDetailComponent } from '../../my-account/order-detail/order-detail.component';
import { CartComponent } from '../../shopping/cart/cart.component';
import { CheckoutComponent } from '../../shopping/checkout/checkout.component';
import { ChangeProfileComponent } from '../change-profile/change-profile.component';
import { KycPendingComponent } from '../kyc-pending/kyc-pending.component';
import { KycComponent } from '../kyc/kyc.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent,
    AccountDetailsComponent,
    AccountAddressesComponent,
    AccountWishlistComponent,
    AccountHistoryComponent,
    EditAddressComponent,
    EventHistoryComponent,
    OrderDetailComponent,
    OffersComponent,
    KycPendingComponent,
    KycComponent,
    ChangeProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule ,
    SiteModule,
    RouterModule.forChild([
      { path: 'kyc' , component: KycComponent, canActivate: [AuthGuardService]},
      { path: 'changeProfile' , component: ChangeProfileComponent,  canActivate: [AuthGuardService]},
      { path: 'kycpending' , component: KycPendingComponent, canActivate: [AuthGuardService]},
      { path: 'account-details', component: AccountDetailsComponent,  canActivate: [AuthGuardService]},
      { path: 'account-addresses', component: AccountAddressesComponent,  canActivate: [AuthGuardService]},
      { path: 'account-wishlist', component: AccountWishlistComponent,  canActivate: [AuthGuardService]},
      { path: 'account-history', component: AccountHistoryComponent,  canActivate: [AuthGuardService]},
      { path: 'edit-address/:id', component: EditAddressComponent,  canActivate: [AuthGuardService]},
      { path: 'add-address', component: EditAddressComponent,  canActivate: [AuthGuardService]},
      { path: 'event-history', component: EventHistoryComponent,  canActivate: [AuthGuardService]},
      { path: 'order-detail/:id', component: OrderDetailComponent,  canActivate: [AuthGuardService]},
      { path: 'offers', component: OffersComponent,  canActivate: [AuthGuardService]},
      { path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuardService,CheckoutService]},
      { path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
    ])
  ]
})
export class AuthModule { }
