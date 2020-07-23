import { BlogDetailsComponent } from './../blog-details/blog-details.component';
import { BlogComponent } from './../blog/blog.component';
import { SlugPipe } from './../slug.pipe';
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
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { OtpComponent } from '../../auth/otp/otp.component';
import { KycPendingComponent } from '../../auth/kyc-pending/kyc-pending.component';
import { ForgetPasswordComponent } from '../../auth/forget-password/forget-password.component';
import { ForgetOtpComponent } from '../../auth/forget-otp/forget-otp.component';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';
import { KycComponent } from '../../auth/kyc/kyc.component';
import { ChangeProfileComponent } from '../../auth/change-profile/change-profile.component';
import { ContactComponent } from '../../layout/contact/contact.component';
import { AboutComponent } from '../../layout/about/about.component';
import { TermsAndConditionComponent } from '../../layout/terms-and-condition/terms-and-condition.component';
import { PaymentComponent } from '../../layout/payment/payment.component';
import { SearchComponent } from '../../layout/search/search.component';
import { ManufactureComponent } from '../../layout/manufacture/manufacture.component';
import { PrivacyComponent } from '../../layout/privacy/privacy.component';
import { MachinerySearchComponent } from '../../layout/machinery-search/machinery-search.component';
import { MachineryProductsComponent } from '../../layout/machinery-products/machinery-products.component';
import { CheckoutComponent } from '../../shopping/checkout/checkout.component';
import { CartComponent } from '../../shopping/cart/cart.component';
import { ProductComponent } from '../../shopping/product/product.component';
import { AccountDetailsComponent } from '../../my-account/account-details/account-details.component';
import { AccountAddressesComponent } from '../../my-account/account-addresses/account-addresses.component';
import { AccountWishlistComponent } from '../../my-account/account-wishlist/account-wishlist.component';
import { AccountHistoryComponent } from '../../my-account/account-history/account-history.component';
import { EditAddressComponent } from '../../my-account/edit-address/edit-address.component';
import { EventHistoryComponent } from '../../my-account/event-history/event-history.component';
import { OrderDetailComponent } from '../../my-account/order-detail/order-detail.component';
import { OffersComponent } from '../../my-account/offers/offers.component';
import { LoginGuardService } from '../../auth-guard/login-guard.service';
import { AuthGuardService } from '../../auth-guard/auth-guard.service';
import { CheckoutService } from '../../auth-guard/checkout.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeoService } from '../../SEO/seo.service';



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
    LoginComponent,
    RegisterComponent,
    OtpComponent,
    KycPendingComponent,
    ForgetPasswordComponent,
    ForgetOtpComponent,
    ChangePasswordComponent,
    KycComponent,
    ChangeProfileComponent,
    ContactComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PaymentComponent,
    SearchComponent,
    ManufactureComponent,
    PrivacyComponent,
    MachinerySearchComponent,
    MachineryProductsComponent,
    CheckoutComponent,
    CartComponent,
    ProductComponent,
    AccountDetailsComponent,
    AccountAddressesComponent,
    AccountWishlistComponent,
    AccountHistoryComponent,
    EditAddressComponent,
    EventHistoryComponent,
    OrderDetailComponent,
    OffersComponent,
    SlugPipe,
    BlogComponent,
    BlogDetailsComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
      { path: 'blog', component: BlogComponent},
      { path: 'blog/:id', component: BlogDetailsComponent},
      { path: 'login', component: LoginComponent,canActivate: [LoginGuardService]},
      { path: 'register', component: RegisterComponent,canActivate: [LoginGuardService]},
      { path: 'kyc' , component: KycComponent, canActivate: [AuthGuardService]},
      { path: 'changeProfile' , component: ChangeProfileComponent,  canActivate: [AuthGuardService]},
      { path: 'kycpending' , component: KycPendingComponent, canActivate: [AuthGuardService]},
      { path: 'account-details', component: AccountDetailsComponent,  canActivate: [AuthGuardService]},
      { path: 'account-addresses', component: AccountAddressesComponent,  canActivate: [AuthGuardService]},
      { path: 'account-wishlist', component: AccountWishlistComponent,  canActivate: [AuthGuardService]},
      { path: 'account-history', component: AccountHistoryComponent,  canActivate: [AuthGuardService]},
      { path: 'edit-address/:id', component: EditAddressComponent,  canActivate: [AuthGuardService]},
      { path: 'add-address', component: EditAddressComponent,  canActivate: [AuthGuardService]},
      { path: 'event-history', component: EventHistoryComponent,  canActivate: [AuthGuardService]},
      { path: 'order-detail/:id', component: OrderDetailComponent,  canActivate: [AuthGuardService]},
      { path: 'offers', component: OffersComponent,  canActivate: [AuthGuardService]},
      { path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuardService,CheckoutService]},
      { path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
      { path: 'product', component: ProductComponent},
      { path: 'machinery/:id', component: MachineryProductsComponent},
      { path: 'contact', component: ContactComponent},
      { path: 'about', component: AboutComponent},
      { path: 'terms', component: TermsAndConditionComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'machinery/search/:value', component: MachinerySearchComponent},
      { path: 'search/:value', component: SearchComponent},
      { path: 'privacy', component: PrivacyComponent},
      { path: 'home', component: HomeComponent},
      { path: 'manufacture/:id', component: CategoryComponent},
      { path: 'events' , component: EventsComponent},
      { path: 'machinery' , component: MachineryComponent},
      { path: 'event/:id' , component: EventComponent, canActivate: [KycguardService]},
      { path: 'products/machinery/:id', component: MachineryProductComponent, canActivate: [KycguardService]},
      { path: 'product-details/:id' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      { path: 'manufacture/:idm/:subcategory/:subsubcategory' , component: SubsubComponent},
      { path: 'manufacture/:idm/:cat/:sub/:subsub' , component: FilterProductComponent},
      { path: 'filternav' , component: FilterNavBarComponent},
      { path: 'category', component: CategoryComponent},
      { path: 'manufacture/:idm/:subcategory', component: SubcategoryComponent},
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
    NgxImageZoomModule,SlugPipe]  ,
    providers: [SeoService],
})
export class SiteModule { }
