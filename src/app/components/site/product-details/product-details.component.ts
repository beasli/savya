import { PRICELIST, CARTVIEW } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  totaldiamond:any;
  totalgold:any;
  finegold: any;
  platinum: any;
  priceplat: any;
  fineplat: any;
  totalplat:any;
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
  totalstone:any;
  pricestone: any;
  pricegold2: any;
  gross:any;
  colvalue: any;
  silver:any;
  pricesilver:any;
  totalsilver:any;
  loader:boolean;
  page:boolean;
  scroll:boolean;
  drop:any;
  loading:boolean;
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }]
  };
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router) {
    this.drop=this.api.drop; 
    this.route.params.subscribe(params => {
      this.pid = params.id;
      this.ngOnInit();
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
    if (this.assets.productpaltinum)  {
      this.getplatinum();
      }
    if (this.assets.productsilver) {
        this.getsilver();
      }

    this.total();
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
    console.log('im called');
    this.api.addToCart(s);
  }
   getproduct() {
     this.loader=true;
     this.page=false;
    this.api.Post(PRICELIST, {} ).then(data  => {
      if  (data['data']) {
      this.pricelist = data['data'];
      this.api.Post(PRODUCTDETAILS, {product_id: this.pid} ).then(data  => {
        this.page=true;
        this.loader=false;
        if(data['data'])  {
          this.data = data['data'];
        }
        this.data.color ? this.colvalue = this.data.color : this.colvalue = "";
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
        if (this.assets.productsilver) {
          this.getsilver();
        }
        this.api.Post(SUBCATEGORY, {category_id: this.data['category']} ).then(data  => {
  
              let result = data['data'].find(x => x.id == this.data['subcategory']);
              this.subcategory = result['subcategory'];
  
              this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.data['subcategory']} ).then(data  => {
  
                  let result = data['data'].find(x => x.id == this.data['subcategorytype']);
                  this.subsubcategory = result['title'];
  
              }).catch(d=>{console.log(d);});
       }).catch(d=>{console.log(d);});
    }).catch(d=>{console.log(d);});
      }
    });

    

    this.api.Post(CATEGORY, {} ).then(data  => {
     let result = data['data'].find(x => x.id == this.data['category']);
     this.category = result['category'];
  }).catch(d=>{console.log(d);});
}

   createjson() {
     this.loading=true;
    if(this.drop==0)
    {
      document.getElementById("openModalButton").click();
    }
    else if(this.drop==1)
   {
    let j = {};
    let temparray = [];
    let waste = {};
    if (this.gold!=null) {
        j['option'] = this.gold.option;
        j['weight'] = this.gold.goldweight;
        j['materialType'] = this.pricegold.gold_type;
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
      if  (this.platinum.wastage) {
        if(localStorage.getItem("waste")!=null) {
        waste = JSON.parse(localStorage.getItem("waste"));
        waste[this.pid] = this.platinum.wastage;
        localStorage.setItem("waste",JSON.stringify(waste));
      } else {
        waste[this.pid] = this.platinum.wastage;
        localStorage.setItem("waste",JSON.stringify(waste));
      }
      }
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

    if (this.silver!=null) {
      j['option'] = this.silver.charge_type;
      j['weight'] = this.silver.silverqty;
      j['materialType'] = this.silver.silver_type;
      j['productId'] = this.pid;
      j['metal'] = 'Silver';
      j['makingCharge'] = this.silver.silvercharges;
      temparray.push(j);
      j = {};
    }
    let uid = this.api.getUserInfo();
    uid = uid['uid'];
    j['assests'] = temparray;
    j['category'] = this.data['category'];
    j['count'] = this.value;
    j['defaultColor'] = this.colvalue;
    j['description'] = this.data.description;
    j['productCode'] = this.data.productcode;
    j['productId'] = Number(this.pid);
    j['productName'] = this.data.productname;
    j['productType'] = this.data.size;
    j['productSize'] = this.selectedsize;
    let size = {'size': this.selectedsize,'type': this.data.size };
    let prd_sizes = {};
    prd_sizes[this.pid] = size;
    if (localStorage.getItem("prd_sizes") != null) {
      prd_sizes = JSON.parse(localStorage.getItem("prd_sizes"));
      prd_sizes[this.pid] = size;
      localStorage.setItem("prd_sizes", JSON.stringify(prd_sizes));
    } else {
      prd_sizes[this.pid] = size;
      localStorage.setItem("prd_sizes", JSON.stringify(prd_sizes));
    }
    j['subCategory'] = this.data['subcategory'];
    j['subSubCategory'] = this.data['subcategorytype'];
    j['userid'] = (uid).toString();
    temparray = [];
    temparray.push(j);
    j = {};
    j['data'] = temparray;
    this.api.addToCart(j);
    console.log(this.loading);
    let check=this. checkCart(this.pid);
    if(check==true)
    {
      this.loading=false;
    }
    else if(check==false)
    {
      this.loading=false;
    }
   }

    
   }

  colormetal(value) {
    this.colvalue = value;
  }
   getstone(value)  {
      this.stone = value;
      let name = value.stonetype;
      this.pricestone = this.pricelist.stone.find(x => x.stone_type == name);
      this.totalstone = this.api.price(this.stone.stoneqty,this.pricestone.price,this.stone.type,this.stone.stonecharges);
      this.totalstone = Math.round(this.totalstone.price);
      this.total();
      this.grossweight();
   }

   getgold(value) {
     this.gold = value;
     if (this.sizes) {
       let increament = this.selectedsize - this.defaultsize;
       increament = increament * 0.2;
       this.gold.goldweight = (Number(this.gold.goldweight) + increament).toFixed(3);
     }
     this.pricegold = this.pricelist.gold.find(x => x.gold_type == this.gold.goldquality);
     this.pricegold2 = this.pricelist.gold.find(x => x.gold_type == '24K');
     if (this.gold.option == "pergram") {
      this.totalgold = this.api.price(this.gold.goldweight,this.pricegold.price,this.gold.option,this.gold.makingcharge);
      this.finegold = Number(this.totalgold.weight).toFixed(3);
      this.totalgold = Math.round(this.totalgold.price);
     }  else if (this.gold.option == "percentage") {
      this.totalgold = this.api.price(this.gold.goldweight,this.pricegold2.price,this.gold.option,this.gold.makingcharge,0,this.pricegold.valuein);
      this.finegold = Number(this.totalgold.weight).toFixed(3);
      this.totalgold = Math.round(this.totalgold.price);
    }
    this.total();
     this.grossweight();
   }

   getplatinum() {
    this.platinum = this.assets.productpaltinum;
    if (this.sizes) {
      let increament = this.selectedsize - this.defaultsize;
      increament = increament * 0.2;
      this.platinum.platinum_qty = (Number(this.platinum.platinum_qty) + increament).toFixed(2);
    }
    this.priceplat = this.pricelist.platinum;
    this.totalplat = this.api.price(this.platinum.platinum_qty,this.priceplat[0].price,this.platinum.charge_type,this.platinum.platinum_charge,this.platinum.wastage);
    this.totalplat = Math.round(this.totalplat.price);
    this.total();
    this.grossweight();
  }

  getsilver() {
    this.silver = this.assets.productsilver;
    if (this.sizes) {
      let increament = this.selectedsize - this.defaultsize;
      increament = increament * 0.2;
      this.silver.silverqty = (Number(this.silver.silverqty) + increament).toFixed(2);
    }
    this.pricesilver = this.pricelist.silver;
    this.totalsilver = this.api.price(this.silver.silverqty,this.pricesilver.price,this.silver.charge_type,this.silver.silvercharges,this.silver.wastage);
    this.totalsilver = Math.round(this.totalsilver.price);
    this.total();
    this.grossweight();
  }
   colorClarity(value0, value1) {
     value0 ? this.defaultdiamond[0] = value0 : this.defaultdiamond[1] = value1;
    this.diamondprice();
  }

  diamondprice()  {
    let name = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
    this.pricediamond = this.pricelist.diamond_master.find(x => x.name == name);
    this.totaldiamond = this.api.price(this.diamond.diamondqty,this.pricediamond.price,this.diamond.type,this.diamond.diamondcharge);
    this.totaldiamond = Math.round(this.totaldiamond.price);
    this.total();
    this.grossweight();
  }

  grossweight() {
    let weight = 0;
    if(this.gold){
      weight = weight+Number(this.gold.goldweight);
    }
    if(this.platinum){
      weight = weight+Number(this.platinum.platinum_qty);
    }
    if(this.diamond){
      weight = weight+Number(this.diamond.diamondqty*0.2);
    }
    if(this.stone){
      weight = weight+Number(this.stone.stoneqty*0.2);
    }
    if(this.silver){
      weight = weight+Number(this.silver.silverqty);
    }
    this.gross = weight.toFixed(3);
  }

  total() {
    let price = 0;
    if(this.gold){
      price = price+this.totalgold;
    }
    if(this.platinum){
      price = price+this.totalplat;
    }
    if(this.diamond){
      price = price+this.totaldiamond;
    }
    if(this.stone){
      price = price+this.totalstone;
    } 
    if(this.silver){
      price = price+this.silver;
    }
    this.totalprice = price;
  }
  ngOnInit(): void {

    this.loader=true;
    this.page=false;
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);    
     });  
  }

}
