import { SeoService } from './../../SEO/seo.service';
import { Component, OnInit } from '@angular/core';
import { BLOG } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
data:any;
image:any;
  constructor(private router:Router,public api:ApiService,public seo:SeoService) {


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
    })
   }

   gotoblog(data){
    this.router.navigate(['blog',data.title.replace(/ /g,'-')],{queryParams:{'blog_id':data.id}});
   }

  ngOnInit(): void {
  }

}
