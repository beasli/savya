import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SiteModule } from '../../site/site/site.module';

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
