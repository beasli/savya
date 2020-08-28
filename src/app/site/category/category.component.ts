import { ApiService } from 'src/app/api/api.service';
import { CATEGORY, IMAGE, BANNER } from './../../../config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeStyle } from '@angular/platform-browser';
import { CategoryPipe } from 'src/app/components/site/slug.pipe';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  slider_imgs = {};
  id:any;
  data: any;
  callshadow:any;
  img_url=IMAGE;
  Banner:any;
  name: any;
  constructor(private route: ActivatedRoute,private api: ApiService,private router:Router,private sanitizer: DomSanitizer
    ,private catpipe: CategoryPipe) { 
    this.route.queryParamMap.subscribe(params =>{
      
        this.id = params.get('manufacture_id');
        this.route.params.subscribe(
          params=>{
            this.name = params.id;
          });    
        if(this.id!=null) {
        this.api.Post(CATEGORY, {manufacture_id: this.id} ).then(data  => {
          this.data = data['data'];
          console.log(this.data);
        //  this.data = [];
          this.api.Post(BANNER,{user_id:this.id,type:3}).then(data=>{this.Banner=data['data'].filter(slide => slide.place === 'Website');});
        });
      } else{
        this.api.Post(CATEGORY, {} ).then(data  => {
          this.data = data['data'];
        //  this.data = [];
          console.log(this.data);
      });
    }
  });
  }


  getlink(s): SafeStyle {
    s = s.replace(/ /g, "%20");
    s = s.replace(/\(/g, "%28");
    s = s.replace(/\)/g, "%29");
    return this.sanitizer.bypassSecurityTrustStyle('url('+ IMAGE + 'category/' + s + ')');
  }

  go(value){
    if(this.id){
      this.router.navigate(['manufacture', this.name.replace(/ /g, "-"), this.catpipe.transform(value)],{queryParams:{'manufacture':this.id}});
    }
    else{
      this.router.navigate(['subcategory', this.catpipe.transform(value)]);
    }
  }

  ngOnInit(): void {
  }

}
