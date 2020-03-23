import { PRICELIST, CARTVIEW } from './../../../../config';
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
  data:any;
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
  totaldiamond = 0;
  totalgold = 0;
  finegold: any;
  platinum: any;
  priceplat: any;
  fineplat: any;
  totalplat = 0;
  defaultsize: any;
  sizes: any;
  selectedsize: any;
  totalprice: any;
  certificate:any;
  certificateurl: any;
  value = 1;
  wish:any;
 cart:any;
  stone: any;
  totalstone = 0;
  pricestone: any;
  constructor(private api: ApiService, private route: ActivatedRoute) {

    this.api.Post(PRICELIST, {} ).then(data  => {
      if  (data['data']) {
      this.pricelist = data['data'];
      }
    });

    this.route.params.subscribe(params => {
      this.pid = params.id;
      this.getproduct();
      });

      this.api.Post(CARTVIEW,{user_id: this.api.uid}).then(data=>{
        this.cart=data['data'];
    }).catch(d => {
      console.log(d);
    })
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
    if  (increament !=0 ) {
        this.defaultsize = this.selectedsize;
      }
   }
   quantity(pid)
   {
        let cart=this.api.getCart();
        if(cart)
      {
              let result=cart.find(x => x.product_id == pid);
              // console.log(result);
              if(result)
              { 
                    let cartId=result.cart_id;
                    let c=Number(result.count);
                    if(c!=0){
                    this.value = c;}
                    return c;
                } 
                else{
                  return(0);
                }
        }
   }
   wishlist(pid) {
    // console.log("in wishlist");
     //console.log(pid);
     this.api.checkWishlist(pid);
   }
   checkHeart(pid)
  {

    //console.log("checkheart");
    this.wish = this.api.getWishlist();
    if (this.wish) {
            let result = this.wish.find(x => x.product_id === pid);
        //  console.log("result="+result);
            if (result)
            { 
             // console.log("present");
              return true;
            
            }
            else
            {
              //console.log("not present");
              return false;
              
            } 
      }
      else{
        //console.log("not present");
        return false;
      }
  }
   qtyUpdate(pid,value)
   {
        this.api.qtyUpdate(pid,value);
   }
   checkCart(pid)
  {
      let check=this.api.checkCart(pid);
     // console.log(check);
      return check;
 }
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
  }
  addToCart(s)
  {
    this.api.addToCart(s);
  }
   quantity2(value) {
     if (this.value != 0 && value == -1)
    {
      this.value = this.value+value;
    }
    if(value == 1)
    {
      this.value = this.value+value;
    }
      console.log(this.value);
   }
   getproduct() {
    this.api.Post(PRODUCTDETAILS, {product_id: this.pid} ).then(data  => {
      if(data['data'])  {
        this.data = data['data'];
    }
      this.assets = data['assets'];
      this.prd_img = this.assets['image'];
      this.certificate = data['Certification'];
      this.certificateurl = data['certificte_url']+'/';
      this.recents = data['recentproduct'];
      this.url = data['url'] + '/';
      if (this.data.size) {
        this.defaultsize = this.data.default_size;
        this.sizes = this.data.size_type.split(',');
        this.selectedsize = this.defaultsize;
      }
      if (this.assets.gold.length) {
        this.getgold(this.assets.gold[0]);
      }
      if (this.assets.stone.length) {
        this.getstone(this.assets.stone[0]);
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

   createjson() {
    let j = {};
    let temparray = [];
    if (this.gold!=null) {
        j['option'] = this.gold.option;
        j['weight'] = this.gold.goldweight;
        j['materialType'] = this.pricegold.gold_type;
        j['wastage'] = this.gold.wastage;
        j['productId'] = this.pid;
        j['metal'] = 'Gold';
        j['makingCharge'] = this.gold.makingcharge;
        temparray.push(j);
        j = {};
      }
    if (this.diamond!=null) {
      j['option'] = this.diamond.type;
      j['weight'] = this.diamond.diamondqty;
      j['materialType'] = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
      j['productId'] = this.pid;
      j['metal'] = 'Diamond';
      j['makingCharge'] = this.diamond.diamondcharge;
      temparray.push(j);
      j = {};
    }
    if (this.platinum!=null) {
      j['option'] = this.platinum.charge_type;
      j['weight'] = this.platinum.platinum_qty;
      j['materialType'] = "Platinum";
      j['wastage'] = this.platinum.wastage;
      j['productId'] = this.pid;
      j['metal'] = 'Platinum';
      j['makingCharge'] = this.platinum.platinum_charge;
      temparray.push(j);
      j = {};
    }
    if (this.stone!=null) {
      j['option'] = this.stone.type;
      j['weight'] = this.stone.stoneqty;
      j['materialType'] = this.stone.stonetype;
      j['productId'] = this.pid;
      j['metal'] = 'Stone';
      j['makingCharge'] = this.stone.stonecharges;
      temparray.push(j);
      j = {};
    }
    let uid = this.api.getUserInfo();
    uid = uid['uid'];
    j['assests'] = temparray;
    j['category'] = this.data['category'];
    j['count'] = this.value;
    this.data.color ? j['defaultColor'] = this.data.color : j['defaultColor'] = "";
    j['description'] = this.data.description;
    j['productCode'] = this.data.productcode;
    j['productId'] = Number(this.pid);
    j['productName'] = this.data.productname;
    j['productType'] = this.data.size_type;
    j['subCategory'] = this.data['subcategory'];
    j['subSubCategory'] = this.data['subcategorytype'];
    j['userid'] = (uid).toString();
    temparray = [];
    temparray.push(j);
    j = {};
    j['data'] = temparray;
    this.api.addToCart(j);


    }

   getstone(value){
      this.stone = value;
      let name = value.stonetype;
      this.pricestone = this.pricelist.stone.find(x => x.stone_type == name);
      if (!this.stone.stonecharges || this.stone.stonecharges == 0) {
      this.totalstone = this.pricestone.price * Number(this.stone.stoneqty);
    } else {
      this.totalstone = ((Number(this.stone.stonecharges) + Number(this.pricestone.price)) * Number(this.stone.stoneqty));
      this.totalstone = Math.round(this.totalstone);
    }
      this.totalprice = this.totaldiamond+this.totalgold+this.totalplat+this.totalstone;
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
          this.totalgold  =  (Number(this.pricegold.price) + Number(this.gold.makingcharge)) * Number(this.gold.goldweight);
          this.finegold = this.totalgold;
     }

     if (this.gold.option == "percentage") {
      this.pricegold = this.pricelist.gold.find(x => x.gold_type == '24K');
      this.finegold = Number(this.gold.goldweight) - (Number(this.gold.goldweight) / 100) * Number(this.gold.makingcharge);
      this.totalgold = this.pricegold.price * this.finegold;
    }

     if (this.gold.wastage) {
      this.finegold = Number(this.gold.goldweight);
      let wasteprice = ((Number(this.gold.goldweight) / 100) *  Number(this.gold.wastage)) * Number(this.pricegold.price);
      this.totalgold = (Number(this.pricegold.price) + Number(this.gold.makingcharge)) * Number(this.finegold) + wasteprice;
     }
     this.finegold = this.finegold.toFixed(2);
     this.totalgold = Math.round(this.totalgold);
     this.totalprice = this.totaldiamond+this.totalgold+this.totalplat;
   }

   getplatinum() {
    this.platinum = this.assets.productpaltinum;
    if (this.sizes) {
      let increament = this.selectedsize - this.defaultsize;
      increament = increament * 0.2;
      this.platinum.platinum_qty = (Number(this.platinum.platinum_qty) + increament).toFixed(2);
    }
    this.priceplat = this.pricelist.platinum;
    if (this.platinum.charge_type == "pergram") {
         this.totalplat =  (Number(this.priceplat[0].price) + Number(this.platinum.platinum_charge)) * Number(this.platinum.platinum_qty);
         this.fineplat = this.totalplat;
    }

    if (this.platinum.charge_type == "percentage") {
    this.fineplat = Number(this.platinum.platinum_qty) - (Number(this.platinum.platinum_qty) / 100) * Number(this.platinum.platinum_charge);
    this.totalplat = this.priceplat[0].price * this.fineplat;
   }

    if (this.platinum.wastage) {
     this.fineplat = Number(this.platinum.platinum_qty);
     let wasteprice = ((Number(this.platinum.platinum_qty) / 100) *  Number(this.platinum.wastage))*Number(this.priceplat[0].price);
     this.totalplat = (Number(this.priceplat[0].price) + Number(this.platinum.platinum_charge)) * Number(this.fineplat)+wasteprice;
    }
    this.totalplat = Math.round(this.totalplat);
    this.fineplat = this.fineplat.toFixed(2);
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
