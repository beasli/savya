import { PRICELIST } from './../../../../config';
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
  data: any;
  assets: any;
  recents: any;
  category: any;
  subcategory: any;
  subsubcategory: any;
  url: any;
  prd_img: any;
  goldquality: any;
  gold: any;
  pricelist: any;
  pricegold: any;
  diamond: any;
  diamondclarity: any;
  diamondcolour: any;
  defaultdiamond: any;
  pricediamond: any;
  totaldiamond: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {

    this.api.Post(PRICELIST, {} ).then(data  => {
      this.pricelist = data['data'];
      console.log(this.pricelist);
    });

    this.route.params.subscribe(params => {
      this.pid = params.id;
      this.getproduct();
      });
   }

   getproduct() {
    this.api.Post(PRODUCTDETAILS, {product_id: this.pid} ).then(data  => {

      this.data = data['data'];
      console.log(this.data);
      this.assets = data['assets'];
      console.log(this.assets);
      this.prd_img = this.assets['image'][0]['image'];
      this.recents = data['recentproduct'];
      this.url = data['url'] + '/';
      if (this.assets.gold.length) {
          this.gold = this.assets.gold[0];
          this.pricegold = this.pricelist.gold.find(x => x.gold_type == this.gold.goldquality);
      }

      if (this.assets.diamond.length) {
        this.diamond = this.assets.diamond[0];
        this.diamondcolour = this.diamond.diamondcolor.split(',');
        this.diamondclarity = this.diamond.diamondclarity.split(',');
        this.defaultdiamond = this.diamond.default_size.split(',');
        this.diamondprice();
      }

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

   getgold(value) {
     this.gold = value;
     this.pricegold = this.pricelist.gold.find(x => x.gold_type == this.gold.goldquality);
   }
   color(value) {
    this.defaultdiamond[0] = value;
    this.diamondprice();
  }
  clarity(value) {
    this.defaultdiamond[1] = value;
    this.diamondprice();
  }

  diamondprice()  {
    let name = this.defaultdiamond[0]+'/'+this.defaultdiamond[1];
    this.pricediamond = this.pricelist.diamond_master.find(x => x.name == name);
    if (!this.diamond.diamondcharge || this.diamond.diamondcharge == 0) {
      this.totaldiamond = this.pricediamond.price * this.diamond.diamondqty;
    }
    else {
      console.log(this.diamond.diamondcharge);
      console.log(this.pricediamond.price);
      console.log(this.diamond.diamondqty);
      this.totaldiamond = (this.diamond.diamondcharge + this.pricediamond.price) * this.diamond.diamondqty;
    }
  }
  ngOnInit(): void {
  }

}
