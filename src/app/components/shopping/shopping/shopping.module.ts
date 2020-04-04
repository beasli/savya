import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CartComponent } from '../cart/cart.component';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../../auth-guard/auth-guard.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CheckoutService } from '../../auth-guard/checkout.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SiteModule } from '../../site/site/site.module';




@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SiteModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forChild([
      { path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuardService,CheckoutService]},
      { path: 'cart', component: CartComponent},
      { path: 'product', component: ProductComponent},
    ])
  ]
})
export class ShoppingModule { }
