import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { SlugPipe, CategoryPipe, SubCategoryPipe, AntiPipe, MyCurrencyPipe, SummaryPipe, INRCurrencyPipe } from '../site/slug.pipe';
import { SliderComponent } from '../site/slider/slider.component';
import { ExclusiveBannerComponent } from '../layout/exclusive-banner/exclusive-banner.component';
import { ProductHolderComponent } from '../site/product-holder/product-holder.component';
import { LiveratesComponent } from '../site/liverates/liverates.component';
import { LoaderComponent } from '../site/loader/loader.component';
import { RouterModule } from '@angular/router';
import { MachineryHolderComponent } from '../layout/machinery-holder/machinery-holder.component';
import { TestimonialsComponent } from '../site/testimonials/testimonials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SlugPipe,
    CategoryPipe,
    SubCategoryPipe,
    AntiPipe,
    SliderComponent,
    ExclusiveBannerComponent,
    MachineryHolderComponent,
    ProductHolderComponent,
    LiveratesComponent,
    LoaderComponent,
    MyCurrencyPipe,
    SummaryPipe,
    INRCurrencyPipe,
    LoaderComponent,
    TestimonialsComponent,

  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
    RouterModule,
    CommonModule,
    NgxImageZoomModule,
  ],
  exports: [LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
    TestimonialsComponent,
    NgbModule,
    CommonModule,
    SlickCarouselModule,
    NgxImageZoomModule,
    RouterModule,
    NgbModule,
    SlugPipe,
    CategoryPipe,
    SubCategoryPipe,
    AntiPipe,
    SliderComponent,
    ExclusiveBannerComponent,
    ProductHolderComponent,
    LiveratesComponent,
    LoaderComponent,
    MyCurrencyPipe,
    SummaryPipe,
    INRCurrencyPipe,
    MachineryHolderComponent
  ]
})
export class SharedModule { }
