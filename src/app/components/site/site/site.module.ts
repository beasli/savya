import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SliderComponent } from '../slider/slider.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { FilterProductComponent } from '../filter-product/filter-product.component';
import { ProductHolderComponent } from '../product-holder/product-holder.component';
import { BestSellerProductComponent } from '../best-seller-product/best-seller-product.component';



@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    TestimonialsComponent,
    FilterProductComponent,
    ProductHolderComponent,
    BestSellerProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent},
      { path: 'filter' ,component: FilterProductComponent}
    ])
  ]
})
export class SiteModule { }
