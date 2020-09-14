import { SimpleNotificationsModule } from 'angular2-notifications';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventsComponent } from './../events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { EventComponent } from '../event/event.component';
import { KycguardService } from '../../auth-guard/kycguard.service';
import { SearchComponent } from '../../layout/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeoService } from '../../SEO/seo.service';
import { SharedModule } from '../../shared/shared.module';
import { LiveComponent } from '../live/live.component';

@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    LiveComponent
  ],
  imports: [
    SharedModule,
    SimpleNotificationsModule.forRoot({
      position:["middle","center"],
       timeOut: 3000,
       showProgressBar: true,
       pauseOnHover: true,
       clickToClose: true
     }),
    RouterModule.forChild([
      { path: 'gold-silver-live-rates', component: LiveComponent},
      { path: 'search/:value', component: SearchComponent},
      { path: 'home', component: HomeComponent}
    ])
  ],
    providers: [SeoService],
})
export class SiteModule { }
