import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsubComponent } from '../subsub/subsub.component';
import { FilterProductComponent } from '../filter-product/filter-product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MachineryComponent } from '../machinery/machinery.component';
import { CategoryComponent } from '../category/category.component';
import { SubcategoryComponent } from '../subcategory/subcategory.component';
import { MachineryProductComponent } from '../machinery-product/machinery-product.component';
import { MachinerySearchComponent } from '../machinery-search/machinery-search.component';
import { MachineryProductsComponent } from '../machinery-products/machinery-products.component';

@NgModule({
  declarations: [
    MachineryComponent,
    CategoryComponent,
    SubcategoryComponent,
    ProductDetailsComponent,
    SubsubComponent,
    MachineryProductComponent,
    FilterProductComponent,
    MachinerySearchComponent,
    MachineryProductsComponent,],
  imports: [
    CommonModule,
    
  ]
})
export class JewelryModule { }
