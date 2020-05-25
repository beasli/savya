import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditAddressComponent } from './../edit-address/edit-address.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { AccountAddressesComponent } from '../account-addresses/account-addresses.component';
import { AccountWishlistComponent } from '../account-wishlist/account-wishlist.component';
import { AccountHistoryComponent } from '../account-history/account-history.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../../auth-guard/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventHistoryComponent } from '../event-history/event-history.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteModule } from '../../site/site/site.module';
import { OffersComponent } from '../offers/offers.component';


@NgModule({
  declarations: [
    AccountDetailsComponent,
    AccountAddressesComponent,
    AccountWishlistComponent,
    AccountHistoryComponent,
    EditAddressComponent,
    EventHistoryComponent,
    OrderDetailComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({
      position:["middle","center"],
       timeOut: 3000,
       showProgressBar: true,
       pauseOnHover: true,
       clickToClose: true
     }),
    ReactiveFormsModule,
    SiteModule,
    RouterModule.forChild([
      { path: 'account-details', component: AccountDetailsComponent,  canActivate: [AuthGuardService]},
      { path: 'account-addresses', component: AccountAddressesComponent,  canActivate: [AuthGuardService]},
      { path: 'account-wishlist', component: AccountWishlistComponent,  canActivate: [AuthGuardService]},
      { path: 'account-history', component: AccountHistoryComponent,  canActivate: [AuthGuardService]},
      { path: 'edit-address/:id', component: EditAddressComponent,  canActivate: [AuthGuardService]},
      { path: 'add-address', component: EditAddressComponent,  canActivate: [AuthGuardService]},
      { path: 'event-history', component: EventHistoryComponent,  canActivate: [AuthGuardService]},
      { path: 'order-detail/:id', component: OrderDetailComponent,  canActivate: [AuthGuardService]},
      { path: 'offers', component: OffersComponent,  canActivate: [AuthGuardService]}
    ])
  ]
})
export class AccountModule { }
