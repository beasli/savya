import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlogDetailsComponent } from '../site/blog-details/blog-details.component';
import { BlogComponent } from '../site/blog/blog.component';



@NgModule({
  declarations: [BlogComponent,
    BlogDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([ 
      { path: '', component: BlogComponent},
      { path: ':id', component: BlogDetailsComponent},
      ])
  ]
})
export class BlogModule { }
