import { MachineryProductsComponent } from './../machinery-products/machinery-products.component';
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
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SiteModule } from '../../site/site/site.module';
import { MachinerySearchComponent } from '../machinery-search/machinery-search.component';

@NgModule({
  declarations: [
    
   
  ],
  imports: [
    CommonModule,
    SiteModule,
    SimpleNotificationsModule.forRoot({
      position:["bottom","left"],
       timeOut: 3000,
       showProgressBar: true,
       pauseOnHover: true,
       clickToClose: true
     }),
    RouterModule.forChild([
    ])
  ]
})
export class LayoutModule { }
