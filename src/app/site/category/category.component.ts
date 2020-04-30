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
  constructor(private route: ActivatedRoute) { 
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
