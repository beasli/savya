import { SeoService } from './../../SEO/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BLOG } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
data:any;
  id: string;
  image: any;
  current:any;
  other: any;
  constructor(public route:ActivatedRoute,public router:Router,public api:ApiService,public seo:SeoService) {
    this.api.Get(BLOG).then(data=>{
      this.data = data['data'];
      this.image = data['img_url'];
      console.log(this.data[0]);
      console.log(this.data['title']);
      console.log(this.data['keywords']);
    //  this.seo.updateTitle(this.data[0]['title']);
   // this.seo.updateOgUrl(data['ogUrl']);
    //Updating Description tag dynamically with title
 //   this.seo.updateKeywords(this.data[0]['keywords'])
    });
   }

   gotoblog(data){
    this.router.navigate(['blog',data.title.replace(/ /g,'-')],{queryParams:{'blog_id':data.id}});
   }

   ngOnDestroy(){
    this.seo.updateTitle();
    this.seo.updateKeywords();
   }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params =>{
      this.id = params.get('blog_id');
     this.api.Post(BLOG,{id:this.id}).then(data=>{
       
       this.current = data['data'];
       console.log(this.current);
      this.other = data['Other_blogs'];
      console.log(this.other);
         this.seo.updateTitle(this.current['title']);
   this.seo.updateKeywords(this.current['keywords']);
     });
     });
  }

}
