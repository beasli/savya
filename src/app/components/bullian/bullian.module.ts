import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BullianComponent } from '../site/bullian/bullian.component';
import { BullianMerchantComponent } from '../site/bullian-merchant/bullian-merchant.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BullianComponent, BullianMerchantComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: BullianComponent},
      { path: ':id', component: BullianMerchantComponent}
      ])
  ]
})
export class BullianModule { }
