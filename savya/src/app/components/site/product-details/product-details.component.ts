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
  discol=[];
  discla=[];
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
  defgold:any;
  defsilver:any;
  defplat:any;
  loader:boolean;
  page:boolean;
  scroll:boolean;
  drop:any;
  loading:boolean;
  viewdone=0;
  manufacture;
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
  privious: any;
  sizelist: any[];
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router) {
    this.drop=this.api.drop;
    this.route.params.subscribe(params => {
      this.clean();
      this.pid = params.id;
      this.ngOnInit();
      this.getproduct();
      });

    

    this.api.Get(CARTVIEW+"?user_id="+this.api.uid).then(data=>{
        this.cart=data['data'];
    }).catch(d => {
      // if(d.status != 401 || d.status != 503){
      //  // this.api.onFail('Your session is expired please login again');
      //   this.api.setGoto();
      //   this.api.setlogin(0);
      //   this.api.logout();
      //   setTimeout(() => {
      // //  this.router.navigate(['/login']);
      //   },1000);
      // } else{
      // console.log(d);
      // }
    })
    this.total();
   }
   
   sizechange(value) {
    this.privious = this.selectedsize;
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
      document.getElementById("mClose").click();
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');

        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      }else if(d.status == 401){
        this.api.onFail('Product already in cart');
      } else{
      console.log(d);
      console.log
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
        if(this.data.jwellery_type == 'Bangles')
            {
              this.sizelist = this.pricelist.bangle;
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
        this.manufacture = data['manufacture'];
        this.url =IMAGE;
        if (this.data.size_type && this.data.size_type != 'None' ) {
          this.defaultsize = this.data.default_size;
          this.sizes = this.data.size_type.split(',');
          this.sizes = this.sizes.filter((v, i, a) => a.indexOf(v) === i); 
          this.sizes = this.sizes.sort();
          this.selectedsize = this.defaultsize;
          let temp = [];
          if(this.sizelist){
          this.sizes.forEach(childObj => {
            console.log(childObj);
             let s = this.sizelist.find(x => x.sizes == childObj);
            temp.push(s);
          });
          this.sizelist = temp;
          console.log(this.sizelist);}
        }
        
          if (this.assets) {
      
            this.goldlist = this.assets.filter(x => x.metrial_type == "Gold");
           if(this.goldlist.length) {this.getgold(this.goldlist[0])};
         
            this.stonelist = this.assets.filter(x => x.metrial_type == "Stone");
           this.stonelist.length ? this.getstone(this.stonelist[0]):false;
         
            this.diamondlist = this.assets.filter(x => x.metrial_type == "Diamond");
            if(this.diamondlist.length){
              this.diamond = this.diamondlist[0];
             this.diamondcolour = this.diamond.color.split(',');
            this.diamondclarity = this.diamond.clarity.split(',');
            this.diamondcolour.forEach(element => {
              this.discol.push(0);
            });
            this.diamondclarity.forEach(element => {
              this.discla.push(0)
            });
            this.defaultdiamond = this.diamond.default_color_clarity.split('/');
            this.diamondprice();
          }
          this.defplat = this.assets.find(x => x.metrial_type == "Platinum");
            if(this.defplat){
              this.getplatinum();}
              this.defsilver = this.assets.find(x => x.metrial_type == "Silver");
            if(this.defsilver){
              this.getsilver();}
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
        //j['product_size'] = this.selectedsize;
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
        //j['product_size'] = this.selectedsize;
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
        //j['product_size'] = this.selectedsize;
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
        //j['product_size'] = this.selectedsize;
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
      //j['product_size'] = this.selectedsize;
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


   this.selectedsize ? j['product_size'] = this.selectedsize:j['product_size'] = 0;

   if(this.data.jwellery_type == 'Ring' || this.data.jwellery_type == 'Bangles' || this.data.jwellery_type == 'Chain'){
    if(this.data.jwellery_type == 'Bangles'){
      let si = this.sizelist.find(x => x.sizes == this.selectedsize);
       j['product_size'] = si.bangle_size;
    }else{
    j['product_size'] = this.selectedsize;
   }
   }
   else { j['product_size'] = 0};

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
      this.pricestone = this.pricelist.stone.find(x => x.type.toUpperCase() == name.toUpperCase());
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

   clean(){
    this.pid= null;
    this.data= null;
    this.assets= null;
    this.recents= null;
    this.category= null;
    this.subcategory= null;
    this.subsubcategory= null;
    this.url= null;
    this.prd_img= null;
    this.goldquality= null;
    this.gold= null;
    this.pricelist= null;
    this.pricegold= null;
    this.diamond= null;
    this.diamondclarity= null;
    this.diamondcolour= null;
    this.defaultdiamond= null;
    this.pricediamond= null;
    this.totaldiamond= null;
    this.totalgold= null;
    this.finegold= null;
    this.platinum= null;
    this.priceplat= null;
    this.fineplat= null;
    this.totalplat= null;
    this.defaultsize= null;
    this.sizes= null;
    this.selectedsize= null;
    this.totalprice= null;
    this.certificate= null;
    this.value = 1;
    this.wish= null;
    this.cart= null;
    this.stone= null;
    this.totalstone= null;
    this.pricestone= null;
    this.pricegold2= null;
    this.gross= null;
    this.colvalue= null;
    this.silver= null;
    this.pricesilver= null;
    this.totalsilver= null;
    this.loader= null;
    this.page= null;
    this.scroll= null;
    this.drop= this.api.drop;;
    this.loading= null;
    this.viewdone=0;
    this.metalcolour= null;
    this.goldlist= null;
    this.stonelist= null;
    this.diamondlist= null;
    this.message= null;
    this.btn = 1;
    this.privious= null;
    this.defsilver= null;
    this.defplat= null;
    this.manufacture= null;
    this.sizelist= null;
  }

   getgold(value) {
     this.gold = Object.assign({},this.goldlist.find(x => x.jwellery_size == value.jwellery_size));
    console.log(this.gold);
     if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Ring') {
        
      if(this.data.gender == 'FeMale'){
        if(this.selectedsize >= 6 && this.selectedsize <= 10){
          this.gold.weight = (Number(this.gold.weight)*0.95).toFixed(2);
        } else if(this.selectedsize >= 15 && this.selectedsize <= 18){
          this.gold.weight = (Number(this.gold.weight)*1.07).toFixed(2);
        } else if(this.selectedsize >= 19 && this.selectedsize <= 22){
          this.gold.weight = (Number(this.gold.weight)*1.1).toFixed(2);
        }
      }else if(this.data.gender == 'Male'){
        if(this.selectedsize >= 14 && this.selectedsize <= 17){
          this.gold.weight = (Number(this.gold.weight)*0.95).toFixed(2);
        } else if(this.selectedsize >= 22 && this.selectedsize <= 25){
          this.gold.weight = (Number(this.gold.weight)*1.08).toFixed(2);
        } else if(this.selectedsize >= 26 && this.selectedsize <= 30){
          this.gold.weight = (Number(this.gold.weight)*1.12).toFixed(2);
        }  else if(this.selectedsize >= 31 && this.selectedsize <= 34){
          this.gold.weight = (Number(this.gold.weight)*1.15).toFixed(2);
        }
      }
     } else if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Bangles') {
      
      let a = 1;
     let increament = this.selectedsize - this.defaultsize;
     if(increament > 0){
     for(let i = 0;i < increament;i++){
       a += a*0.05;
     }
    }else if(increament < 0){
      for(let i = 0;i > increament;i--){
        a -= a*0.05;
      }
     }
    //  increament = increament * 0.2;
     this.gold.weight = (Number(this.gold.weight) * a).toFixed(3);
    } else if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Chain') {
      
      let increament = this.selectedsize - this.defaultsize;
      increament = (Number(this.gold.weight)/Number(this.defaultsize)) * increament;
      this.gold.weight = (Number(this.gold.weight) + increament).toFixed(3);
    }
     this.pricegold = this.pricelist.gold.find(x => x.type == this.gold.jwellery_size);
     //this.pricegold = {"id":1,"metrial_type":"Gold","user_id":"5","type":"14KT","price":"2700","value_in":"60","created_at":"2020-04-21 15:53:56","updated_at":"2020-04-21 15:53:56"};
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
    if (this.gold && !this.pricegold) {
      this.btn = 0;
      // document.getElementById("openModalButton2").click();
      //  this.message = 'Please Choose Another option in gold in this product \n as it is not available with current gold selection';
    }
  else  if (this.platinum && !this.priceplat) {
    this.btn = 0;
    
    // document.getElementById("openModalButton2").click();
    // this.message = 'Please Choose Another option in platinum in this product \n as it is not available with current platinum selection';
    }
  else  if (this.diamond && !this.pricediamond) {
    this.btn = 0;
    
    // document.getElementById("openModalButton2").click();
    // this.message = 'Please Choose Another option in diamond in this product \n as it is not available with current diamond selection';
    }
 else   if (this.stone && !this.pricestone) {
  this.btn = 0;
  
  // document.getElementById("openModalButton2").click();
  // this.message = 'Please Choose Another option in stone in this product \n as it is not available with current stone selection';
    }
   else if (this.silver && !this.pricesilver) {
    this.btn = 0;
    
    // document.getElementById("openModalButton2").click();
    // this.message = 'Please Choose Another option in silver in this product \n as it is not available with current silver selection';
    } else{
      this.btn = 1;
    }
   }
   getplatinum() {
    this.platinum = Object.assign({},this.defplat);
    console.log(this.platinum);
   if(this.platinum)
    {
      if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Ring') {
        
        if(this.data.gender == 'FeMale'){
          if(this.selectedsize >= 6 && this.selectedsize <= 10){
            this.platinum.weight = (Number(this.platinum.weight)*0.95).toFixed(2);
          } else if(this.selectedsize >= 15 && this.selectedsize <= 18){
            this.platinum.weight = (Number(this.platinum.weight)*1.07).toFixed(2);
          } else if(this.selectedsize >= 19 && this.selectedsize <= 22){
            this.platinum.weight = (Number(this.platinum.weight)*1.1).toFixed(2);
          }
        }else if(this.data.gender == 'Male'){
          if(this.selectedsize >= 14 && this.selectedsize <= 17){
            this.platinum.weight = (Number(this.platinum.weight)*0.95).toFixed(2);
          } else if(this.selectedsize >= 22 && this.selectedsize <= 25){
            this.platinum.weight = (Number(this.platinum.weight)*1.08).toFixed(2);
          } else if(this.selectedsize >= 26 && this.selectedsize <= 30){
            this.platinum.weight = (Number(this.platinum.weight)*1.12).toFixed(2);
          }  else if(this.selectedsize >= 31 && this.selectedsize <= 34){
            this.platinum.weight = (Number(this.platinum.weight)*1.15).toFixed(2);
          }
        }
    } else if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Bangles') {
      
      let a = 1;
     let increament = this.selectedsize - this.defaultsize;
     if(increament > 0){
     for(let i = 0;i < increament;i++){
       a += a*0.05;
     }
    }else if(increament < 0){
      for(let i = 0;i > increament;i--){
        a -= a*0.05;
      }
     }
    //  increament = increament * 0.2;
      this.platinum.weight = (Number(this.platinum.weight) * a).toFixed(2);
    } else if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Chain') {
      
      let increament = this.selectedsize - this.defaultsize;
      increament = (Number(this.platinum.weight)/Number(this.defaultsize)) * increament;
      this.platinum.weight = (Number(this.platinum.weight) + increament).toFixed(2);
    }

    this.priceplat = this.pricelist.platinum.find(x => x.metrial_type == "Platinum");
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
    console.log('In silver');
    this.silver = Object.assign({},this.defsilver);
    if (this.silver)
     {
       if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Ring') {
        
        if(this.data.gender == 'FeMale'){
          if(this.selectedsize >= 6 && this.selectedsize <= 10){
            this.silver.weight = (Number(this.silver.weight)*0.95).toFixed(2);
          } else if(this.selectedsize >= 15 && this.selectedsize <= 18){
            this.silver.weight = (Number(this.silver.weight)*1.07).toFixed(2);
          } else if(this.selectedsize >= 19 && this.selectedsize <= 22){
            this.silver.weight = (Number(this.silver.weight)*1.1).toFixed(2);
          }
        }else if(this.data.gender == 'Male'){
          if(this.selectedsize >= 14 && this.selectedsize <= 17){
            this.silver.weight = (Number(this.silver.weight)*0.95).toFixed(2);
          } else if(this.selectedsize >= 22 && this.selectedsize <= 25){
            this.silver.weight = (Number(this.silver.weight)*1.08).toFixed(2);
          } else if(this.selectedsize >= 26 && this.selectedsize <= 30){
            this.silver.weight = (Number(this.silver.weight)*1.12).toFixed(2);
          }  else if(this.selectedsize >= 31 && this.selectedsize <= 34){
            this.silver.weight = (Number(this.silver.weight)*1.15).toFixed(2);
          }
        }

    } else if (this.sizes && this.privious != this.selectedsize &&  this.data.jwellery_type == 'Bangles') {
      
      let a = 1;
     let increament = this.selectedsize - this.defaultsize;
     if(increament > 0){
     for(let i = 0;i < increament;i++){
       a += a*0.05;
     }
    }else if(increament < 0){
      for(let i = 0;i > increament;i--){
        a -= a*0.05;
      }
     }
    //  increament = increament * 0.2;
      this.silver.weight = (Number(this.silver.weight)*a).toFixed(2);
    }else if (this.sizes && this.privious != this.selectedsize  && this.data.jwellery_type == 'Chain') {
      
      let increament = this.selectedsize - this.defaultsize;
      increament = (Number(this.silver.weight)/Number(this.defaultsize)) * increament;
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
     if(value0 != 0)
     {
      this.defaultdiamond[0] = value0;
      this.diamondprice();
    }else if(value1 != 0){
      this.defaultdiamond[1] = value1;
      this.diamondprice();
    }
  }

  diamondprice()  {
   
    for(let i=0;i < this.diamondclarity.length;i++){
      let name = this.defaultdiamond[0] + '/' +this.diamondclarity[i];
      if(this.diamondclarity[i] != this.defaultdiamond[1] ){
      let p = this.pricelist.diamond_master.find(x => x.type == name);
      
      if(p){
        this.discla[i] = 0;
      }else{
        this.discla[i] = 1;
      }}
    }

    for(let i=0;i < this.diamondcolour.length;i++){

      let name = this.diamondcolour[i] + '/' +this.defaultdiamond[1];

      if(this.diamondcolour[i] != this.defaultdiamond[0] ){
      let p = this.pricelist.diamond_master.find(x => x.type == name);
      console.log(name);
      console.log("cla");
      console.log(p);
      if(p){
        this.discol[i] = 0;
        console.log(this.discol[i]);
      }else{
        this.discol[i] = 1;
        console.log(this.discol[i]);
      }
    }
    }
    console.log(this.discla);
    console.log(this.discol);


    let name = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
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
