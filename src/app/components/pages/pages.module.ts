import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../layout/about/about.component';
import { ContactComponent } from '../layout/contact/contact.component';
import { PaymentComponent } from '../layout/payment/payment.component';
import { PrivacyComponent } from '../layout/privacy/privacy.component';
import { TermsAndConditionComponent } from '../layout/terms-and-condition/terms-and-condition.component';
import { BangleComponent } from '../site/bangle/bangle.component';
import { RingComponent } from '../site/ring/ring.component';
import { SelltermsComponent } from '../site/sellterms/sellterms.component';



@NgModule({
  declarations: [
    SelltermsComponent,
    BangleComponent,
    RingComponent,
    PrivacyComponent,
    ContactComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([ 
      { path: 'privacy', component: PrivacyComponent},
      { path: 'contact', component: ContactComponent},
      { path: 'about', component: AboutComponent},
      { path: 'terms', component: TermsAndConditionComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'bangle', component: BangleComponent},
      { path: 'ring', component: RingComponent},
      { path: 'sterms', component: SelltermsComponent},
    
      ])
  ]
})
export class PagesModule { }
