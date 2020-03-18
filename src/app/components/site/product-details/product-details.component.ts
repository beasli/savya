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
  totalgold: any;
  finegold: number;
  platinum: any;
  priceplat: any;
  fineplat: number;
  totalplat: any;
  defaultsize: any;
  sizes: any;
  selectedsize: any;
  totalprice: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {

    this.api.Post(PRICELIST, {} ).then(data  => {
      this.pricelist = data['data'];
      // console.log(this.pricelist);
    });

    this.route.params.subscribe(params => {
      this.pid = params.id;
      this.getproduct();
      });
      this.totalprice = this.totaldiamond+this.totalgold+this.totalplat;
   }
   sizechange(value) {
    this.selectedsize = value;
    if (this.assets.gold.length)  {
    this.getgold(this.gold);
    }
    if (this.assets.productpaltinum)  {
    this.getplatinum();
    }
    this.totalprice = this.totaldiamond+this.totalgold+this.totalplat;
    let increament = this.selectedsize - this.defaultsize;
      if(increament !=0 ) {
        this.defaultsize = this.selectedsize;
      }
   }
   quantity(value) {
      console.log(value);
   }
   getproduct() {
    this.api.Post(PRODUCTDETAILS, {product_id: this.pid} ).then(data  => {

      this.data = data['data'];
      // console.log(this.data);
      this.assets = data['assets'];
      // console.log(this.assets);
      this.prd_img = this.assets['image'][0]['image'];
      this.recents = data['recentproduct'];
      this.url = data['url'] + '/';
      if (this.data.size) {
        this.defaultsize = this.data.default_size;
        this.sizes = this.data.size_type.split(',');
        this.selectedsize = this.defaultsize;
        console.log(this.defaultsize);
        console.log(this.sizes);
        console.log(this.selectedsize);
      }
      if (this.assets.gold.length) {
        this.getgold(this.assets.gold[0]);
      }

      if (this.assets.diamond.length) {
        this.diamond = this.assets.diamond[0];
        this.diamondcolour = this.diamond.diamondcolor.split(',');
        this.diamondclarity = this.diamond.diamondclarity.split(',');
        this.defaultdiamond = this.diamond.default_size.split(',');
        this.diamondprice();
      }
      if (this.assets.productpaltinum) {
        this.getplatinum();
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
     if(this.sizes) {
       let increament = this.selectedsize - this.defaultsize;
       increament = increament * 0.2;
       this.gold.goldweight = (Number(this.gold.goldweight) + increament).toFixed(2);
     }
     this.pricegold = this.pricelist.gold.find(x => x.gold_type == this.gold.goldquality);

     if (this.gold.option == "pergram") {
          // console.log("per gram");
          this.totalgold  =  (Number(this.pricegold.price) + Number(this.gold.makingcharge)) * Number(this.gold.goldweight);
     }

     if (this.gold.option == "percentage") {
      // console.log("percentage");
      this.pricegold = this.pricelist.gold.find(x => x.gold_type == '24K');
      this.finegold = Number(this.gold.goldweight) - (Number(this.gold.goldweight) / 100) * Number(this.gold.makingcharge);
      this.totalgold = this.pricegold.price * this.finegold;
    }

     if (this.gold.wastage) {
      // console.log("gold waste and per gram");
      this.finegold = Number(this.gold.goldweight);
      let wasteprice = ((Number(this.gold.goldweight) / 100) *  Number(this.gold.wastage)) * Number(this.pricegold.price);
      this.totalgold = (Number(this.pricegold.price) + Number(this.gold.makingcharge)) * Number(this.finegold) + wasteprice;
     }
     this.totalgold = Math.round(this.totalgold);
     this.totalprice = this.totaldiamond+this.totalgold+this.totalplat;
    //  console.log( this.totalgold);
   }

   getplatinum() {
    this.platinum = this.assets.productpaltinum;
    if (this.sizes) {
      let increament = this.selectedsize - this.defaultsize;
      increament = increament * 0.2;
      this.platinum.platinum_qty = (Number(this.platinum.platinum_qty) + increament).toFixed(2);
    }
    this.priceplat = this.pricelist.platinum;
    // console.log( this.platinum);
    if (this.platinum.charge_type == "pergram") {
        //  console.log("per gram");
         this.totalplat =  (Number(this.priceplat[0].price) + Number(this.platinum.platinum_charge)) * Number(this.platinum.platinum_qty);
        //  console.log(this.priceplat[0].price);
        //  console.log(this.platinum.platinum_charge);
        //  console.log(this.platinum.platinum_qty);
        //  console.log(this.totalplat);
    }

    if (this.platinum.charge_type == "percentage") {
    //  console.log("percentage");
    this.fineplat = Number(this.platinum.platinum_qty) - (Number(this.platinum.platinum_qty) / 100) * Number(this.platinum.platinum_charge);
    this.totalplat = this.priceplat[0].price * this.fineplat;
   }

    if (this.platinum.wastage) {
    //  console.log("platinum waste and per gram");
     this.fineplat = Number(this.platinum.platinum_qty);
    //  console.log(this.fineplat);
    //  console.log((Number(this.platinum.platinum_qty) / 100) *  Number(this.platinum.wastage));
     let wasteprice = ((Number(this.platinum.platinum_qty) / 100) *  Number(this.platinum.wastage))*Number(this.priceplat[0].price);
     this.totalplat = (Number(this.priceplat[0].price) + Number(this.platinum.platinum_charge)) * Number(this.fineplat)+wasteprice;
    //  console.log(this.totalplat);
    }
    this.totalplat = Math.round(this.totalplat);
    // console.log(this.totalplat);
    this.totalprice = this.totaldiamond+this.totalgold+this.totalplat;
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
    let name = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
    this.pricediamond = this.pricelist.diamond_master.find(x => x.name == name);
    if (!this.diamond.diamondcharge || this.diamond.diamondcharge == 0) {
      this.totaldiamond = this.pricediamond.price * this.diamond.diamondqty;
    } else {
      this.totaldiamond = ((Number(this.diamond.diamondcharge) + Number(this.pricediamond.price)) * this.diamond.diamondqty);
      this.totaldiamond = Math.round(this.totaldiamond);
    }
    this.totalprice = this.totaldiamond+this.totalgold+this.totalplat;
  }
  ngOnInit(): void {
  }

}
