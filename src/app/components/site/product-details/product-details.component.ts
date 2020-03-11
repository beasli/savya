import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTDETAILS, CATEGORY, SUBCATEGORY, SUBCATEGORYTYPE } from 'src/config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pid: string;
  data: [];
  assets: [];
  recents: [];
  category: any;
  subcategory: any;
  subsubcategory: any;
  url: any;
  prd_img: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    
    this.pid = this.route.snapshot.paramMap.get('id');
    
    this.api.Post(PRODUCTDETAILS, {product_id: this.pid} ).then(data  => {

        this.data = data['data'];
        console.log(this.data);
        this.assets = data['assets'];
        this.prd_img = this.assets['image']['image'];
        console.log(this.assets['image'].image);
        this.recents = data['recentproduct'];
        this.url = data['url'] + '/';

        this.api.Post(SUBCATEGORY, {category_id: this.data['category']} ).then(data  => {

              let result = data['data'].find(x => x.id == this.data['subcategory']);
              this.subcategory = result['subcategory'];

              this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.data['subcategory']} ).then(data  => {

                  let result = data['data'].find(x => x.id == this.data['subcategorytype']);
                  this.subsubcategory = result['title'];

              });
       });
    });

    this.api.Post(CATEGORY, {} ).then(data  => {
       let result = data['data'].find(x => x.id == this.data['category']);
       this.category = result['category'];
    });

   }

  ngOnInit(): void {
  }

}
