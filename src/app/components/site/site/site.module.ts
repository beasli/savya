import { BlogDetailsComponent } from './../blog-details/blog-details.component';
import { BlogComponent } from './../blog/blog.component';
import { SlugPipe, MyCurrencyPipe, SummaryPipe, INRCurrencyPipe, CategoryPipe, SubCategoryPipe, AntiPipe } from './../slug.pipe';

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

import { ProductHolderComponent } from '../product-holder/product-holder.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EventComponent } from '../event/event.component';

import { ShareButtonsConfig, ShareModule } from '@ngx-share/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { FilterNavBarComponent } from '../filter-nav-bar/filter-nav-bar.component';
import { LoaderComponent } from '../loader/loader.component';


// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { BullianComponent } from '../bullian/bullian.component';
import { BullianMerchantComponent } from '../bullian-merchant/bullian-merchant.component';
import { KycguardService } from '../../auth-guard/kycguard.service';

import { MachineryHolderComponent } from '../../layout/machinery-holder/machinery-holder.component';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { KycPendingComponent } from '../../auth/kyc-pending/kyc-pending.component';
import { KycComponent } from '../../auth/kyc/kyc.component';
import { ChangeProfileComponent } from '../../auth/change-profile/change-profile.component';
import { ContactComponent } from '../../layout/contact/contact.component';
import { AboutComponent } from '../../layout/about/about.component';
import { TermsAndConditionComponent } from '../../layout/terms-and-condition/terms-and-condition.component';
import { PaymentComponent } from '../../layout/payment/payment.component';
import { SearchComponent } from '../../layout/search/search.component';
import { PrivacyComponent } from '../../layout/privacy/privacy.component';
import { CheckoutComponent } from '../../shopping/checkout/checkout.component';
import { CartComponent } from '../../shopping/cart/cart.component';
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
import { LiveComponent } from '../live/live.component';
import { SelltermsComponent } from '../sellterms/sellterms.component';
import { BangleComponent } from '../bangle/bangle.component';
import { RingComponent } from '../ring/ring.component';



const customConfig: ShareButtonsConfig = {
  autoSetMeta: true,
  twitterAccount: ''
};




@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    TestimonialsComponent,
    ProductHolderComponent,
    ExclusiveBannerComponent,
    LiveratesComponent,
    EventsComponent,
    EventComponent,
    LoaderComponent,
    FilterNavBarComponent,
    BullianComponent,
    BullianMerchantComponent,
   
    MachineryHolderComponent,
    LoginComponent,
    RegisterComponent,
    KycPendingComponent,
    KycComponent,
    ChangeProfileComponent,
    ContactComponent,
    AboutComponent,
    TermsAndConditionComponent,
    PaymentComponent,
    SearchComponent,
    PrivacyComponent,
    CheckoutComponent,
    CartComponent,
    AccountDetailsComponent,
    AccountAddressesComponent,
    AccountWishlistComponent,
    AccountHistoryComponent,
    EditAddressComponent,
    EventHistoryComponent,
    OrderDetailComponent,
    OffersComponent,
    SlugPipe,
    MyCurrencyPipe,
    SummaryPipe,
    INRCurrencyPipe,
    CategoryPipe,
    SubCategoryPipe,
    AntiPipe,
    BlogComponent,
    BlogDetailsComponent,
    LiveComponent,
    SelltermsComponent,
    BangleComponent,
    RingComponent,
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
      { path: 'page/bangle', component: BangleComponent},
      { path: 'page/ring', component: RingComponent},
      { path: 'gold-silver-live-rates', component: LiveComponent},
      { path: 'sterms', component: SelltermsComponent},
      { path: 'blog', component: BlogComponent},
      { path: 'blog/:id', component: BlogDetailsComponent},
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
      // { path: 'jewelry/machinery/:id', component: MachineryProductsComponent},
      { path: 'contact', component: ContactComponent},
      { path: 'about', component: AboutComponent},
      { path: 'terms', component: TermsAndConditionComponent},
      { path: 'payment', component: PaymentComponent},
      // { path: 'jewelry/machinery/search/:value', component: MachinerySearchComponent},
      { path: 'search/:value', component: SearchComponent},
      { path: 'privacy', component: PrivacyComponent},
      { path: 'home', component: HomeComponent},
      // { path: 'jewelry/manufacture/:id', component: CategoryComponent},
      { path: 'events' , component: EventsComponent},
      // { path: 'jewelry/machinery' , component: MachineryComponent},
      { path: 'event/:id' , component: EventComponent, canActivate: [KycguardService]},
      // { path: 'products/machinery/:id', component: MachineryProductComponent, canActivate: [KycguardService]},
      // { path: 'product-details' , component: ProductDetailsComponent, canActivate: [KycguardService]},
      // { path: 'jewelry/manufacture/:idm/:subcategory/:subsubcategory' , component: SubsubComponent},
      // { path: 'jewelry/manufacture/:idm/:cat/:sub/:subsub' , component: FilterProductComponent},
      { path: 'filternav' , component: FilterNavBarComponent},
      // { path: 'category', component: CategoryComponent},
      // { path: 'jewelry/manufacture/:idm/:subcategory', component: SubcategoryComponent},
      { path: 'bullion-dealers', component: BullianComponent},
      { path: 'bullion-dealers/:id', component: BullianMerchantComponent},
    //   { path: 'jewelry/:subcategory', component: SubcategoryComponent},
    //   { path: 'jewelry/:subcategory/:subsubcategory' , component: SubsubComponent},
    //   { path: 'jewelry/:cat/:sub/:subsub' , component: FilterProductComponent},
    //   { path: 'jewelry/:cat/:sub/:subsub/:product' , component: ProductDetailsComponent, canActivate: [KycguardService]
    // },
    ])
  ],
  exports: [LoaderComponent,NgbModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxImageZoomModule,SlugPipe,CategoryPipe,SubCategoryPipe,AntiPipe]  ,
    providers: [SeoService,CategoryPipe,SubCategoryPipe,SlugPipe],
})
export class SiteModule { }
