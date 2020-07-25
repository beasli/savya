import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { SiteModule } from '../../site/site/site.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule ,
    SiteModule,
    RouterModule.forChild([
     
    ])
  ]
})
export class AuthModule { }
