import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AccountModule } from './components/my-account/account/account.module';
import { AuthModule } from './components/auth/auth/auth.module';
import { LayoutModule } from './components/layout/layout/layout.module';
import { ShoppingModule } from './components/shopping/shopping/shopping.module';
import { SiteModule } from './components/site/site/site.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    AuthModule,
    LayoutModule,
    ShoppingModule,
    SiteModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
