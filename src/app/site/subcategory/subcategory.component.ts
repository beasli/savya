import { Component, OnInit } from '@angular/core';
import { SUBCATEGORY } from 'src/config';
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
  constructor(private api: ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(
      params=>{
        this.api.Post(SUBCATEGORY, {category_id: params.id} ).then(data  => {
          this.data = data['data'];
        });
      });
  }

  ngOnInit(): void {
  }

}
