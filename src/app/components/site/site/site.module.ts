import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventsComponent } from './../events/events.component';
import { LiveratesComponent } from './../liverates/liverates.component';
import { ExclusiveBannerComponent } from './../../layout/exclusive-banner/exclusive-banner.component';
import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SliderComponent } from '../slider/slider.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FilterProductComponent } from '../filter-product/filter-product.component';
import { ProductHolderComponent } from '../product-holder/product-holder.component';
import { BestSellerProductComponent } from '../best-seller-product/best-seller-product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EventComponent } from '../event/event.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ShareButtonsConfig, ShareModule } from '@ngx-share/core';

const customConfig: ShareButtonsConfig = {
  autoSetMeta: true,
  twitterAccount: ''
};




@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    TestimonialsComponent,
    FilterProductComponent,
    ProductHolderComponent,
    BestSellerProductComponent,
    ExclusiveBannerComponent,
    LiveratesComponent,
    EventsComponent,
    EventComponent,
    ProductDetailsComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    SlickCarouselModule,
    ShareModule.withConfig(customConfig),
    RouterModule.forChild([
      { path: 'home', component: HomeComponent},
      { path: 'filter/:id' , component: FilterProductComponent},
      { path: 'events' , component: EventsComponent},
      { path: 'event/:id' , component: EventComponent},
      { path: 'product-details/:id' , component: ProductDetailsComponent},
    ])
  ]
})
export class SiteModule { }
