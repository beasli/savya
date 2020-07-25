import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteModule } from '../../site/site/site.module';


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
