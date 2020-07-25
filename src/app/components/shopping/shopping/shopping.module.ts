import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SiteModule } from '../../site/site/site.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SiteModule,
    BrowserAnimationsModule,
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
export class ShoppingModule { }
