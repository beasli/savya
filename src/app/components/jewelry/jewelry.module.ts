import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterProductComponent } from './filter-product/filter-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MachineryComponent } from './machinery/machinery.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { MachineryProductComponent } from './machinery-product/machinery-product.component';
import { MachinerySearchComponent } from './machinery-search/machinery-search.component';
import { MachineryProductsComponent } from './machinery-products/machinery-products.component';
import { SubsubComponent } from './subsub/subsub.component';
import { RouterModule } from '@angular/router';
import { KycguardService } from '../auth-guard/kycguard.service';
import { FilterNavBarComponent } from './filter-nav-bar/filter-nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { ManmodalComponent } from './manmodal/manmodal.component';

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
    MachineryProductsComponent,
    FilterNavBarComponent,
    ManmodalComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([ 
      { path: 'machinery/search/:value', component: MachinerySearchComponent},
      { path: 'machinery/:sid/:name' , component: MachineryProductComponent},
      { path: 'machinery' , component: MachineryComponent},
      { path: 'cart/:id' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      { path: 'wishlist/:id' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      { path: 'order-detail/:id' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      { path: 'checkout/:id' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      { path: 'machinery/:id', component: MachineryProductsComponent},
      { path: 'manufacture/:id', component: CategoryComponent},
      { path: 'manufacture/:idm/:subcategory/:subsubcategory' , component: SubsubComponent},
      { path: 'manufacture/:idm/:cat/:sub/:subsub' , component: FilterProductComponent},
      { path: 'manufacture/:idm/:subcategory', component: SubcategoryComponent},
      
      { path: 'product-details' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      { path: ':subcategory', component: SubcategoryComponent},
      { path: ':subcategory/:subsubcategory' , component: SubsubComponent},
      { path: ':cat/:sub/:subsub' , component: FilterProductComponent},
      { path: ':cat/:sub/:subsub/:product' , component: ProductDetailsComponent, canActivate: [KycguardService]},
    
      ])
  ]
})
export class JewelryModule { }
