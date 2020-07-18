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
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({
      position:["bottom","left"],
       timeOut: 3000,
       showProgressBar: true,
       pauseOnHover: true,
       clickToClose: true
     }),
    ReactiveFormsModule,
    SiteModule,
    RouterModule.forChild([
      
    ])
  ]
})
export class AccountModule { }
