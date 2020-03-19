import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact/contact.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';
import { PaymentComponent } from '../payment/payment.component';
import { SearchComponent } from '../search/search.component';
import { ManufactureComponent } from '../manufacture/manufacture.component';

@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PaymentComponent,
    SearchComponent,
    ManufactureComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      { path: 'contact', component: ContactComponent},
      { path: 'about', component: AboutComponent},
      { path: 'terms', component: TermsAndConditionComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'search/:value', component: SearchComponent},
    ])
  ]
})
export class LayoutModule { }
