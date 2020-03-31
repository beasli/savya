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
import { PrivacyComponent } from '../privacy/privacy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PaymentComponent,
    SearchComponent,
    ManufactureComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forChild([
      { path: 'contact', component: ContactComponent},
      { path: 'about', component: AboutComponent},
      { path: 'terms', component: TermsAndConditionComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'search/:value', component: SearchComponent},
      { path: 'privacy', component: PrivacyComponent},
    ])
  ]
})
export class LayoutModule { }
