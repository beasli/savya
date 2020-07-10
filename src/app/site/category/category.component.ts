import { ApiService } from 'src/app/api/api.service';
import { CATEGORY, IMAGE, BANNER } from './../../../config';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeStyle } from '@angular/platform-browser';

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
  constructor(private route: ActivatedRoute,private api: ApiService,private router:Router,private sanitizer: DomSanitizer) { 
    this.route.params.subscribe(
      params=>{
        this.id = params.id;
        if(params.id!=null) {
        this.api.Post(CATEGORY, {manufacture_id: params.id} ).then(data  => {
          this.data = data['data'];
          this.api.Post(BANNER,{user_id:params.id,type:3}).then(data=>{this.Banner=data['data'].filter(slide => slide.place === 'Website');});
        });
      } else{
        this.api.Post(CATEGORY, {} ).then(data  => {
          this.data = data['data'];
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
      this.router.navigate(['manufacture', this.id, 'subcategory', value]);
    }
    else{
      this.router.navigate(['subcategory', value]);
    }
  }

  ngOnInit(): void {
  }

}
