import { Component, OnInit } from '@angular/core';
import { SUBCATEGORY, CATEGORY, IMAGE } from 'src/config';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  slider_imgs = {};
  data:any;
  category: any;
  img_url=IMAGE;
  constructor(private api: ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(
      params=>{
        this.api.Post(SUBCATEGORY, {category_id: params.id} ).then(data  => {
          this.data = data['data'];

          this.api.Post(CATEGORY, {} ).then(data  => {
            let result = data['data'].find(x => x.id == this.data[0]['category_id']);
            this.category = result['category'];
            console.log(this.category);
         }).catch(d=>{console.log(d);});
        });
      });
  }

  ngOnInit(): void {
  }

}
