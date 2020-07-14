import { SubsubComponent } from './../subsub/subsub.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { FilterNavBarComponent } from '../filter-nav-bar/filter-nav-bar.component';
import { LoaderComponent } from '../loader/loader.component';


// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MachineryComponent } from '../machinery/machinery.component';
import { CategoryComponent } from 'src/app/site/category/category.component';
import { SubcategoryComponent } from 'src/app/site/subcategory/subcategory.component';
import { BullianComponent } from '../bullian/bullian.component';
import { BullianMerchantComponent } from '../bullian-merchant/bullian-merchant.component';
import { KycguardService } from '../../auth-guard/kycguard.service';
import { MachineryProductComponent } from '../../layout/machinery-product/machinery-product.component';
import { MachineryHolderComponent } from '../../layout/machinery-holder/machinery-holder.component';


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
    SubsubComponent,
    LoaderComponent,
    FilterNavBarComponent,
    MachineryComponent,
    CategoryComponent,
    SubcategoryComponent,
    BullianComponent,
    BullianMerchantComponent,
    MachineryProductComponent,
    MachineryHolderComponent,
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxImageZoomModule,
    SimpleNotificationsModule.forRoot({
      position:["bottom","left"],
       timeOut: 3000,
       showProgressBar: true,
       pauseOnHover: true,
       clickToClose: true
     }),
    ShareModule.withConfig(customConfig),
    RouterModule.forChild([
      { path: 'home', component: HomeComponent},
      { path: 'manufacture/:id', component: CategoryComponent},
      { path: 'events' , component: EventsComponent},
      { path: 'MACHINERY' , component: MachineryComponent},
     
      
      { path: 'event/:id' , component: EventComponent, canActivate: [KycguardService]},
      { path: 'products/machinery/:id', component: MachineryProductComponent, canActivate: [KycguardService]},
      { path: 'product-details/:id' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      
      { path: 'manufacture/:idm/subsub/:id' , component: SubsubComponent},
      { path: 'filternav' , component: FilterNavBarComponent},
      
      { path: 'category', component: CategoryComponent},
      
      { path: 'manufacture/:idm/subcategory/:id', component: SubcategoryComponent},
      { path: 'bullion', component: BullianComponent},
      { path: 'bullion/:id', component: BullianMerchantComponent},
      { path: ':subcategory', component: SubcategoryComponent},
      { path: ':subcategory/:subsubcategory' , component: SubsubComponent},
      { path: ':cat/:sub/:subsub' , component: FilterProductComponent},
    ])
  ],
  exports: [LoaderComponent,NgbModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxImageZoomModule,]  ,
})
export class SiteModule { }
