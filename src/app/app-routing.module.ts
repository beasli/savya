import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/site/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'jewelry', loadChildren: './components/jewelry/jewelry.module#JewelryModule'},
  {path: 'page', loadChildren: './components/pages/pages.module#PagesModule'},
  {path: 'account', loadChildren: './components/auth/auth/auth.module#AuthModule'},
  {path: 'blog', loadChildren: './components/blog/blog.module#BlogModule'},
  {path: 'bullion-dealers', loadChildren: './components/bullian/bullian.module#BullianModule'},
  {path: 'events', loadChildren: './components/event/event.module#EventModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
