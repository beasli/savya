import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CartComponent } from '../cart/cart.component';
import { ProductComponent } from '../product/product.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../../auth-guard/auth-guard.service';



@NgModule({
  declarations: [
    CheckoutComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuardService]},
      { path: 'cart', component: CartComponent},
      { path: 'product', component: ProductComponent},
    ])
  ]
})
export class ShoppingModule { }
