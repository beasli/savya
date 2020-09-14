import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KycguardService } from '../auth-guard/kycguard.service';
import { SharedModule } from '../shared/shared.module';
import { EventComponent } from '../site/event/event.component';
import { EventsComponent } from '../site/events/events.component';
import { ShareButtonsConfig, ShareModule } from '@ngx-share/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const customConfig: ShareButtonsConfig = {
  autoSetMeta: true,
  twitterAccount: ''
};

@NgModule({
  declarations: [EventsComponent,
    EventComponent],
  imports: [
    FontAwesomeModule,
    ShareModule.withConfig(customConfig),
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '' , component: EventsComponent},
      { path: ':id' , component: EventComponent, canActivate: [KycguardService]},
      ])
  ]
})
export class EventModule { }
