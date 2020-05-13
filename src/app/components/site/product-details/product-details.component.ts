import { PRICELIST, CARTVIEW, IMAGE, CARTADD } from './../../../../config';
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
  viewdone=0;
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
  metalcolour: any;
  goldlist: any;
  stonelist: any;
  diamondlist: any;
  message: string;
  btn = 1;
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router) {
    this.drop=this.api.drop;
    this.route.params.subscribe(params => {
      this.pid = params.id;
      this.ngOnInit();
      this.getproduct();
      });

    

    this.api.Get(CARTVIEW+"?user_id="+this.api.uid).then(data=>{
        this.cart=data['data'];
    }).catch(d => {
      if(d.error.message == 'Unauthenticated.' && d.status == 401){
       // this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
      //  this.router.navigate(['/login']);
        },1000);
      } else{
      console.log(d);
      }
    })
    this.total();
   }
   
   sizechange(value) {
    this.selectedsize = value;
    if (this.gold)  {
    this.getgold(this.gold);
    }
    if (this.platinum)  {
    this.getplatinum();
    }
    if (this.silver) {
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
    if(this.drop==0)
    {
      this.api.setGoto();
      this.api.onSuccess('Please Login First to Continue');
      setTimeout(() => {
          this.router.navigate(['/login']);
          },1000);
        
    }
    else if(this.drop==1)
   {
     this.api.checkWishlist(pid);
   }
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
    this.message = 'Please wait ...';
    document.getElementById("openModalButton").click();
    this.api.Post(CARTADD, s).then(data=>{
      console.log(data);
      this.api.updateCart();
      this.api.Cart.emit("cartUpdated"+Date.now());
      document.getElementById("mClose").click();
    this.api.onSuccess('Product Successfully added to the cart');
    //  localStorage.setItem('cart',JSON.stringify(data));  
    }).catch(d=>{
      if(d.error.message == 'Unauthenticated.' && d.status == 401){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{
      console.log(d);
      this.api.Cart.emit("cartUpdated"+Date.now());
      }      
    });
    this.message = null;
  }
   getproduct() {
     this.loader=true;
     this.page=false;
     this.api.Put(PRODUCTDETAILS, this.pid ).then(data  => {
        this.page=true;
        this.loader=false;
        console.log(data);
        if(data['data'])  {
          this.data = data['data'];
          this.pricelist = data['price'];
        }
        if(this.data.color)
        {
        this.metalcolour = this.data.color.split(',');
        this.colvalue = this.metalcolour[0];
        }
        this.assets = data['assets'];
        this.prd_img =data['files'];
        this.certificate = data['Certification'];
        this.recents = data['recent_product'];
        this.url =IMAGE;
        if (this.data.size_type) {
          this.defaultsize = this.data.default_size;
          this.sizes = this.data.size_type.split(',');
          this.selectedsize = this.defaultsize;
        }
        if (this.assets) {
          this.goldlist = this.assets.filter(x => x.metrial_type == "Gold");
          this.getgold(this.goldlist[0]);
        }
        if (this.assets) {
          this.stonelist = this.assets.filter(x => x.metrial_type == "Stone");
         this.stonelist.length ? this.getstone(this.stonelist[0]):false;
        }
        if (this.assets) {
          this.diamondlist = this.assets.filter(x => x.metrial_type == "Diamond");
          if(this.diamondlist.length){
            this.diamond = this.diamondlist[0];
           this.diamondcolour = this.diamond.color.split(',');
          this.diamondclarity = this.diamond.clarity.split(',');
          this.defaultdiamond = this.diamond.default_color_clarity.split('/');
          this.diamondprice();
        }
        }
        if (this.assets) {
          this.getplatinum();
        }
        if (this.assets) {
          this.getsilver();
        }
        this.api.Post(SUBCATEGORY, {category_id: this.data['category_id']} ).then(data  => {
  
              let result = data['data'].find(x => x.id == this.data['subcategory_id']);
              this.subcategory = result['subcategory'];
              console.log(data);
              console.log(this.subcategory);
              this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.data['subcategory_id']} ).then(data  => {
                console.log(data);
                  let result = data['data'].find(x => x.id == this.data['subsubcategory_id']);
                  this.subsubcategory = result['title'];
                  console.log(this.subsubcategory);
              }).catch(d=>{console.log(d);});
       }).catch(d=>{console.log(d);});
    }).catch(d=>{console.log(d);});

    

    this.api.Post(CATEGORY, {} ).then(data  => {
     let result = data['data'].find(x => x.id == this.data['category_id']);
     this.category = result['category'];
  }).catch(d=>{console.log(d);});
}

diamondchange(diamond){
  console.log(diamond);
  this.diamond = this.diamondlist.find(x => x.jwellery_size == diamond);
  this.diamondcolour = this.diamond.color.split(',');
  this.diamondclarity = this.diamond.clarity.split(',');
  this.defaultdiamond = this.diamond.default_color_clarity.split('/');
  this.diamondprice();
}

   createjson() {
     this.loading=true;
     this.drop=this.api.drop;
    if(this.drop==0)
    {
      this.api.setGoto();
      this.api.onSuccess('Please Login First to Continue');
      setTimeout(() => {
          this.router.navigate(['/login']);
          },1000);
    }
    else if(this.drop==1)
   {
    let j = {};
    let temparray = [];
    if (this.gold) {
        j['option'] = this.gold.charges_option;
        j['weight'] = this.gold.weight;
        j['wastage'] = this.gold.wastage;
        j['product_size'] = this.selectedsize;
        j['materialType'] = this.pricegold.type;
        j['productId'] = this.pid;
        j['metal'] = 'Gold';
        j['makingCharge'] = this.gold.making_charge;
        temparray.push(j);
        j = {};
      }
    if (this.diamond) {
      j['option'] = this.diamond.charges_option;
      j['weight'] = this.diamond.weight;
      j['wastage'] = this.diamond.wastage;
        j['product_size'] = this.selectedsize;
      j['materialType'] = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
      j['productId'] = this.pid;
      j['metal'] = 'Diamond';
      j['makingCharge'] = this.diamond.making_charge;
      temparray.push(j);
      j = {};
    }
    if (this.platinum!=null) {
      j['option'] = this.platinum.charges_option;
      j['weight'] = this.platinum.weight;
      j['materialType'] = "Platinum";
      j['wastage'] = this.platinum.wastage;
        j['product_size'] = this.selectedsize;
      j['productId'] = this.pid;
      j['metal'] = 'Platinum';
      j['makingCharge'] = this.platinum.making_charge;
      temparray.push(j);
      j = {};
    }
    if (this.stone) {
      j['option'] = this.stone.charges_option;
      j['weight'] = this.stone.weight;
      j['materialType'] = this.stone.jwellery_size;
      j['productId'] = this.pid;
      j['metal'] = 'Stone';
      j['wastage'] = this.stone.wastage;
        j['product_size'] = this.selectedsize;
      j['makingCharge'] = this.stone.making_charge;
      temparray.push(j);
      j = {};
    }

    if (this.silver!=null) {
      j['option'] = this.silver.charges_option;
      j['weight'] = this.silver.weight;
      j['materialType'] = 'Silver';
      j['productId'] = this.pid;
      j['wastage'] = this.silver.wastage;
      j['product_size'] = this.selectedsize;
      j['metal'] = 'Silver';
      j['makingCharge'] = this.silver.making_charge;
      temparray.push(j);
      j = {};
    }
    let uid = this.api.getUserInfo();
    uid = uid.id;
    console.log(uid);
    j['assests'] = temparray;
  //  j['category'] = this.data['category_id'];
    j['count'] = this.value;
    j['jwellery_type'] = this.data.jwellery_type;
    j['selectedColor'] = this.colvalue;
    j['description'] = this.data.description;
    j['productCode'] = this.data.productcode;
    j['productId'] = Number(this.pid);
    j['productName'] = this.data.productname;
    j['productType'] = this.data.jwellery_type;
  //  j['subCategory'] = this.data['subcategory_id'];
  //  j['subSubCategory'] = this.data['subsubcategory_id'];
    j['userid'] = (uid).toString();
    temparray = [];
    temparray.push(j);
    j = {};
    j['data'] = temparray;
    this.addToCart(j);
    console.log(this.loading);
    let check=this.checkCart(this.pid);
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
      let name = this.stone.jwellery_size;
      this.pricestone = this.pricelist.stone.find(x => x.type == name);
      if(this.pricestone){
      this.totalstone = this.api.price(this.stone.weight,this.pricestone.price,this.stone.charges_option,this.stone.making_charge);
      this.totalstone = Math.round(this.totalstone.price);
      this.total();
      this.grossweight();
      this.button();
    } else{
        this.button();
      }
   }

   getgold(value) {
     this.gold = value;
     if (this.sizes) {
       let increament = this.selectedsize - this.defaultsize;
       increament = increament * 0.2;
       this.gold.weight = (Number(this.gold.weight) + increament).toFixed(3);
     }
     this.pricegold = this.pricelist.gold.find(x => x.type == this.gold.jwellery_size);
    if(this.pricegold) {
     this.pricegold2 = this.pricelist.gold.find(x => x.type == '24KT');
     if (this.gold.charges_option == "PerGram" || this.gold.charges_option == "Fixed" ) {
      this.totalgold = this.api.price(this.gold.weight,this.pricegold.price,this.gold.charges_option,this.gold.making_charge);
      this.finegold = Number(this.totalgold.weight).toFixed(3);
      this.totalgold = Math.round(this.totalgold.price);
     }  else if (this.gold.charges_option == "Percentage") {
      this.totalgold = this.api.price(this.gold.weight,this.pricegold2.price,this.gold.charges_option,this.gold.making_charge,0,this.pricegold.value_in);
      this.finegold = Number(this.totalgold.weight).toFixed(3);
      this.totalgold = Math.round(this.totalgold.price);
    }
     this.total();
     this.grossweight();
     this.button();
    } else{
       this.button();
     }
   }

   button(){
     if(this.viewdone==1){
    if (this.gold && !this.pricegold) {
      this.btn = 0;
      document.getElementById("openModalButton2").click();
       this.message = 'Please Choose Another option in gold in this product \n as it is not available with current gold selection';
    }
  else  if (this.platinum && !this.priceplat) {
    this.btn = 0;
    
    document.getElementById("openModalButton2").click();
    this.message = 'Please Choose Another option in platinum in this product \n as it is not available with current platinum selection';
    }
  else  if (this.diamond && !this.pricediamond) {
    this.btn = 0;
    
    document.getElementById("openModalButton2").click();
    this.message = 'Please Choose Another option in diamond in this product \n as it is not available with current diamond selection';
    }
 else   if (this.stone && !this.pricestone) {
  this.btn = 0;
  
  document.getElementById("openModalButton2").click();
  this.message = 'Please Choose Another option in stone in this product \n as it is not available with current stone selection';
    }
   else if (this.silver && !this.pricesilver) {
    this.btn = 0;
    
    document.getElementById("openModalButton2").click();
    this.message = 'Please Choose Another option in silver in this product \n as it is not available with current silver selection';
    } else{
      this.btn = 1;
    }}
   }
   getplatinum() {
    this.platinum = this.assets.find(x => x.metrial_type == "Platinum");
   if(this.platinum)
    {if (this.sizes) {
      let increament = this.selectedsize - this.defaultsize;
      increament = increament * 0.2;
      this.platinum.weight = (Number(this.platinum.weight) + increament).toFixed(2);
    }
    this.priceplat = this.pricelist.platinum.find(x => x.type == "Platinum");
      if(this.priceplat){
    this.totalplat = this.api.price(this.platinum.weight,this.priceplat.price,this.platinum.charges_option,this.platinum.making_charge,this.platinum.wastage);
    this.totalplat = Math.round(this.totalplat.price);
    this.total();
    this.grossweight();
    this.button();
  } else{
      this.button();
    }
  }
  }

  getsilver() {
    this.silver = this.assets.find(x => x.metrial_type == "Silver");
    if (this.silver) {if (this.sizes) {
      let increament = this.selectedsize - this.defaultsize;
      increament = increament * 0.2;
      this.silver.weight = (Number(this.silver.weight) + increament).toFixed(2);
    }
    this.pricesilver = this.pricelist.silver.find(x => x.type == "Silver");
     if(this.pricesilver) {
    this.totalsilver = this.api.price(this.silver.weight,this.pricesilver.price,this.silver.charges_option,this.silver.making_charge,this.silver.wastage);
    this.totalsilver = Math.round(this.totalsilver.price);
    this.total();
    this.grossweight();
    this.button();
  } else{
      this.button();
    }
  }
  }
   colorClarity(value0, value1) {
     value0 ? this.defaultdiamond[0] = value0 : this.defaultdiamond[1] = value1;
    this.diamondprice();
  }

  diamondprice()  {
    let name = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
    console.log(name);
    this.pricediamond = this.pricelist.diamond_master.find(x => x.type == name);
    if (this.pricediamond)
    {
      this.totaldiamond = this.api.price(this.diamond.weight,this.pricediamond.price,this.diamond.charges_option,this.diamond.making_charge);
      this.totaldiamond = Math.round(this.totaldiamond.price);
    
    this.total();
    this.grossweight();
    this.button();
  } else  {
      this.button();
    }
  }

  grossweight() {
    let weight = 0;
    if (this.gold) {
      weight = weight + Number(this.gold.weight);
    }
    if (this.platinum) {
      weight = weight + Number(this.platinum.weight);
    }
    if (this.diamond) {
      weight = weight + Number(this.diamond.weight * 0.2);
    }
    if (this.stone) {
      weight = weight + Number(this.stone.weight * 0.2);
    }
    if (this.silver) {
      weight = weight + Number(this.silver.weight);
    }
    this.gross = weight.toFixed(3);
  }

  total() {
    let price = 0;
    if (this.pricegold) {
      price = price + this.totalgold;
    }
    if (this.priceplat) {
      price = price + this.totalplat;
    }
    if (this.pricediamond) {
      price = price + this.totaldiamond;
    }
    if (this.pricestone) {
      price = price + this.totalstone;
    }
    if (this.pricesilver) {
      price = price + this.totalsilver;
    }
    this.totalprice = price;
  }


  ngAfterViewInit(){
    setTimeout(() => {
    this.viewdone =1;
    if (this.assets) {
      this.goldlist = this.assets.filter(x => x.metrial_type == "Gold");
      this.getgold(this.goldlist[0]);
    }
    if (this.assets) {
      this.stonelist = this.assets.filter(x => x.metrial_type == "Stone");
     this.stonelist.length ? this.getstone(this.stonelist[0]):false;
    }
    if (this.assets) {
      this.diamondlist = this.assets.filter(x => x.metrial_type == "Diamond");
      if(this.diamondlist.length){
        this.diamond = this.diamondlist[0];
       this.diamondcolour = this.diamond.color.split(',');
      this.diamondclarity = this.diamond.clarity.split(',');
      this.defaultdiamond = this.diamond.default_color_clarity.split('/');
      this.diamondprice();
    }
    }
    if (this.assets) {
      this.getplatinum();
    }
    if (this.assets) {
      this.getsilver();
    }
    },2000);
    }
  
  ngOnInit() {
    this.loader = true;
    this.page = false;
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop = data;
      console.log(this.drop);
     });
  }

}
