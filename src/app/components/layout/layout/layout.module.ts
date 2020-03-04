import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';
import { PaymentComponent } from '../payment/payment.component';

@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'contact', component: ContactComponent},
      { path: 'about', component: AboutComponent},
      { path: 'terms', component: TermsAndConditionComponent},
      { path: 'payment', component: PaymentComponent},
    ])
  ]
})
export class LayoutModule { }
