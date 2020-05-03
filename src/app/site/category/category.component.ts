import { ApiService } from 'src/app/api/api.service';
import { CATEGORY, IMAGE, BANNER } from './../../../config';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  constructor(private route: ActivatedRoute,private api: ApiService) { 
    this.route.params.subscribe(
      params=>{
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

  ngOnInit(): void {
  }

}
