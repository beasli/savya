import { PRICELIST, CARTVIEW, IMAGE, CARTADD } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  stone = [];
  totalstone = [];
  pricestone = [];
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
  defaultdiamond2: any;
  discla2=[];
  diamondclarity2: any;
  diamond2: any;
  diamondcolour2: any;
  discol2=[];
  pricediamond2: any;
  totaldiamond2: any;
  diamondlist1: any;
  diamondlist2: any;
  slides: any;
  index = 0;
  @ViewChild('slidez') zlides: ElementRef<HTMLElement>;
  stone_index=[];
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router) {
    this.drop=this.api.drop;
    this.route.queryParamMap.subscribe(params =>{
      this.clean();
      console.log(params.get('detail'));
      this.pid = params.get('detail');
      
      this.ngOnInit();
      this.getproduct();
      });

    

    this.api.Get(CARTVIEW+"?user_id="+this.api.uid).then(data=>{
        this.cart=data['data'];
    }).catch(d => {
      
    })
    this.total();
   }
   ngAfterViewChecked(){
    setTimeout(() => {this.slides = this.zlides.nativeElement.children;},1000);
   }

 
  
  indicateSlide(a) {
    console.log("I"+a);
    this.index = a;
    this.changeSlide();
  }
   changeSlide() {
    for(let i=0;i<this.slides.length;i++){
      this.slides[i].classList.remove("active");
    }
    this.slides[this.index].classList.add("active");
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
          this.router.navigate(['/']);
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
      this.router.navigate(['/']);
      },1000);
    }else if(d.status == 401){
      this.api.onFail('Product already in cart');
    } else{
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
          
          this.sizes = this.sort(this.sizes);
          
          this.selectedsize = this.defaultsize;
          let temp = [];
          if(this.sizelist){
          this.sizes.forEach(childObj => {
            
             let s = this.sizelist.find(x => x.sizes == childObj);
            temp.push(s);
          });
          this.sizelist = temp;
          }
        }
        
          if (this.assets) {
      
            this.goldlist = this.assets.filter(x => x.metrial_type == "Gold");
           if(this.goldlist.length) {this.getgold(this.goldlist[0])};
         
            this.stonelist = this.assets.filter(x => x.metrial_type == "Stone");
            if(this.stonelist.length){
              for(let i=0;i>=0;i++){
                console.log(i);
                let a = this.stonelist.filter(x => x.stone_index == i+1);
                if(a.length)
                {
                  this.stone_index[i] = a;
                  console.log(this.stone_index[i][0]);
                 
                 this.getstone(this.stone_index[i][0],i);
                }else{
                  console.log(i);
                  break;
                }
              }

            }
            // this.stonelist.length ? :false;
            this.diamondlist = this.assets.filter(x => x.metrial_type == "Diamond");
            this.diamondlist1 = this.diamondlist.filter(x => x.diamond_index == 1);
            this.diamondlist2 = this.diamondlist.filter(x => x.diamond_index == 2);
            if(this.diamondlist1.length >= 1 && this.diamondlist2.length == 0 ){
              console.log((this.diamondlist))
              this.diamond = this.diamondlist1[0];
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
          } else if(this.diamondlist1.length >= 1 && this.diamondlist2.length >= 0 ){

            this.diamond = this.diamondlist1[0];
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

            this.diamond2 = this.diamondlist2[0];
            console.log(this.diamond2);
           this.diamondcolour2 = this.diamond2.color.split(',');
          this.diamondclarity2 = this.diamond2.clarity.split(',');
         // console.log(this.)
          this.diamondcolour2.forEach(element => {
            this.discol2.push(0);
          });
          this.diamondclarity2.forEach(element => {
            this.discla2.push(0);
          });
          this.defaultdiamond2 = this.diamond2.default_color_clarity.split('/');
          this.diamondprice(2);
        }
          this.defplat = this.assets.find(x => x.metrial_type == "Platinum");
            if(this.defplat){
              this.getplatinum();}
              this.defsilver = this.assets.find(x => x.metrial_type == "Silver");
            if(this.defsilver){
              this.getsilver();}
          }
          this.api.Post(CATEGORY, {} ).then(data  => {
            let result = data['data'].find(x => x.id == this.data['category_id']);
            this.category = result['category'];
            console.log(this.category);
         }).catch(d=>{});
                         
        this.api.Post(SUBCATEGORY, {category_id: this.data['category_id']} ).then(data  => {
  
              let result = data['data'].find(x => x.id == this.data['subcategory_id']);
              this.subcategory = result['subcategory'];
              
              this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.data['subcategory_id']} ).then(data  => {
                
                  let result = data['data'].find(x => x.id == this.data['subsubcategory_id']);
                  this.subsubcategory = result['title'];
                  
              }).catch(d=>{});
       }).catch(d=>{});
    }).catch(d=>{});
}
valuec(val,def='n'){
  if(def='n'){
    this.value += val;
  } else{
    this.value = val;
  }
}
bubbleSort(array) {
  var done = false;
  while (!done) {
    done = true;
    for (var i = 1; i < array.length; i += 1) {
      if (array[i - 1] > array[i]) {
        done = false;
        var tmp = array[i - 1];
        array[i - 1] = array[i];
        array[i] = tmp;
      }
    }
  }

  return array;
}
sort(ary) {
  let a;
  // use custom compare function that sorts numbers ascending
  a = ary.sort(function(a, b) {
      return a - b;
  });
  return a;
}
diamondchange(value,value2) {
  console.log(value);
  console.log(value2);
  if(value == 1) {
    this.diamond = this.diamondlist1.find(x => x.jwellery_size == value2);
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
  } else if(value == 2) {
    this.diamond2 = this.diamondlist2.find(x => x.jwellery_size == value2);
    console.log(this.diamond2)
    this.diamondcolour2 = this.diamond2.color.split(',');
    this.diamondclarity2 = this.diamond2.clarity.split(',');

    this.diamondcolour2.forEach(element => {
    this.discol2.push(0);
  });
    this.diamondclarity2.forEach(element => {
    this.discla2.push(0);
  });
    this.defaultdiamond2 = this.diamond2.default_color_clarity.split('/');
    this.diamondprice(2);
  }
}
 compare(a, b) {
  if (a < b) {
      return -1;
  } else if (a > b) {
      return 1;
  } else {
      return 0;
  }
}
   createjson() {
     this.loading=true;
     this.drop=this.api.drop;
    if(this.drop==0)
    {
      this.api.setGoto();
      this.api.onSuccess('Please Login First to Continue');
      setTimeout(() => {
          this.router.navigate(['/']);
          },1000);
    }
    else if(this.drop==1)
   {
    let j = {};
    let temparray = [];
    if (this.platinum!=null) {
      j['meenacost_option'] = this.platinum.meenacost_option;
      j['meena_cost'] = this.platinum.meena_cost;
      j['option'] = this.platinum.charges_option;
      j['weight'] = this.platinum.weight;
      j['materialType'] = "Platinum";
      j['wastage'] = this.platinum.wastage;
      j['stone_index'] = '1';
        //j['product_size'] = this.selectedsize;
        j['purity'] =  this.platinum.purity;
      j['productId'] = this.pid;
      j['metal'] = 'Platinum';
      j['makingCharge'] = this.platinum.making_charge;
      temparray.push(j);
      j = {};
    }
    if (this.gold) {
         j['meenacost_option'] = this.gold.meenacost_option;
         j['meena_cost'] = this.gold.meena_cost;
        j['option'] = this.gold.charges_option;
        j['weight'] = this.gold.weight;
        j['wastage'] = this.gold.wastage;
        //j['product_size'] = this.selectedsize;
        j['materialType'] = this.pricegold.type;
        j['productId'] = this.pid;
        j['metal'] = 'Gold';
        j['stone_index'] = '1';
        j['makingCharge'] = this.gold.making_charge;
        temparray.push(j);
        j = {};
      }
      if (this.silver!=null) {
        j['purity'] =  this.silver.purity;
        j['stone_index'] = '1';
        j['meenacost_option'] = this.silver.meenacost_option;
        j['meena_cost'] = this.silver.meena_cost;
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
    if (this.diamond) {
      j['crtcost_option'] = this.diamond.crtcost_option;
        j['certification_cost'] = this.diamond.certification_cost;
        j['stone_index'] = '1';
      j['option'] = 'PerGram';
      j['weight'] = this.diamond.weight;
      j['wastage'] = this.diamond.wastage;
      j['diamondType'] = this.diamond.jwellery_size;
      j['diamond_index'] = '1';
        //j['product_size'] = this.selectedsize;
      j['materialType'] = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
      j['productId'] = this.pid;
      j['metal'] = 'Diamond';
      j['makingCharge'] = this.diamond.making_charge;
      temparray.push(j);
      j = {};
    }
    if (this.diamond2) {
      j['crtcost_option'] = this.diamond2.crtcost_option;
      j['certification_cost'] = this.diamond2.certification_cost;
      j['option'] = 'PerGram';
      j['weight'] = this.diamond2.weight;
      j['wastage'] = this.diamond2.wastage;
      j['diamondType'] = this.diamond2.jwellery_size;
      j['diamond_index'] = '2';
        //j['product_size'] = this.selectedsize;
      j['materialType'] = this.defaultdiamond2[0] + '/' + this.defaultdiamond2[1];
      j['productId'] = this.pid;
      j['metal'] = 'Diamond';
      j['makingCharge'] = this.diamond2.making_charge;
      temparray.push(j);
      j = {};
    }
    if (this.stone.length) {
      this.stone.forEach(obj=>{
        j['option'] = 'PerGram';
        j['weight'] = obj.weight;
        j['materialType'] = obj.jwellery_size;
        j['productId'] = this.pid;
        j['metal'] = 'Stone';
        j['wastage'] = obj.wastage;
        j['stone_index'] = obj.stone_index.toString();
      //j['product_size'] = this.selectedsize;
        j['makingCharge'] = obj.making_charge;
        temparray.push(j);
        j = {};
      })
      
    }

  
    let uid = this.api.getUserInfo();
    uid = uid.id;
    j['assests'] = temparray;
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
    j['userid'] = (uid).toString();
    temparray = [];
    temparray.push(j);
    j = {};
    j['data'] = temparray;
    this.addToCart(j);
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
   getstone(value,i)  {
      this.stone[i] = value;
      console.log(i)
      console.log(this.stone);
      let name = this.stone[i].jwellery_size;
      this.pricestone[i] = this.pricelist.stone.find(x => x.type.toUpperCase() == name.toUpperCase());
      if(this.pricestone[i]){
      this.totalstone[i] = this.api.price(this.stone[i].weight,this.pricestone[i].price,'PerGram',0);
      this.totalstone[i] = this.totalstone[i].price;
      console.log(i);
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
    this.stone_index=[];
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
    this.stone= [];
    this.totalstone= [];
    this.pricestone= [];
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
    this.stonelist= [];
    this.diamondlist= null;
    this.message= null;
    this.btn = 1;
    this.privious= null;
    this.defsilver= null;
    this.defplat= null;
    this.manufacture= null;
    this.sizelist= null;
    this.defaultdiamond2 = null;
    this.discla2=[];
    this.diamondclarity2 = null;
    this.diamond2 = null;
    this.diamondcolour2 =null;
    this.discol2=[];
    this.pricediamond2 =null;
    this.totaldiamond2 =null;
  }
   getgold(value) {
     this.gold = Object.assign({},this.goldlist.find(x => x.jwellery_size == value.jwellery_size));
    
     if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Ring') {
        
      if(this.data.gender == 'FeMale'){
        if(this.selectedsize >= 6 && this.selectedsize <= 10){
          this.gold.weight = (Number(this.gold.weight)*0.95).toFixed(3);
        } else if(this.selectedsize >= 15 && this.selectedsize <= 18){
          this.gold.weight = (Number(this.gold.weight)*1.07).toFixed(3);
        } else if(this.selectedsize >= 19 && this.selectedsize <= 22){
          this.gold.weight = (Number(this.gold.weight)*1.1).toFixed(3);
        }
      }else if(this.data.gender == 'Male'){
        if(this.selectedsize >= 14 && this.selectedsize <= 17){
          this.gold.weight = (Number(this.gold.weight)*0.95).toFixed(3);
        } else if(this.selectedsize >= 22 && this.selectedsize <= 25){
          this.gold.weight = (Number(this.gold.weight)*1.08).toFixed(3);
        } else if(this.selectedsize >= 26 && this.selectedsize <= 30){
          this.gold.weight = (Number(this.gold.weight)*1.12).toFixed(3);
        }  else if(this.selectedsize >= 31 && this.selectedsize <= 34){
          this.gold.weight = (Number(this.gold.weight)*1.15).toFixed(3);
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
   //  this.pricegold2.price = Number(this.pricegold2.price)*(Number(this.gold.wastage) + Number(this.pricegold.value_in))/100;
     if (this.gold.charges_option == "PerGram" || this.gold.charges_option == "Fixed" ) {
      this.totalgold = this.api.price(this.gold.weight,this.pricegold2.price,this.gold.charges_option,this.gold.making_charge,this.gold.wastage,this.pricegold.value_in,this.gold.meena_cost,this.gold.meenacost_option);
      this.finegold = Number(this.totalgold.weight).toFixed(3);
      this.totalgold = this.totalgold.price;
     }  else if (this.gold.charges_option == "Percentage") {
      this.totalgold = this.api.price(this.gold.weight,this.pricegold2.price,this.gold.charges_option,this.gold.making_charge,0,this.pricegold.value_in);
      this.finegold = Number(this.totalgold.weight).toFixed(3);
      this.totalgold = this.totalgold.price;
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
    }
  else  if (this.platinum && !this.priceplat) {
    this.btn = 0;
    
    }
  else  if (this.diamond && !this.pricediamond) {
    this.btn = 0;
    
    }
 else   if (this.stone && !this.pricestone) {
  this.btn = 0;
  
    }
   else if (this.silver && !this.pricesilver) {
    this.btn = 0;
    
    } else{
      this.btn = 1;
    }
   }
   getplatinum() {
    this.platinum = Object.assign({},this.defplat);
   if(this.platinum)
    {
      if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Ring') {
        
        if(this.data.gender == 'FeMale'){
          if(this.selectedsize >= 6 && this.selectedsize <= 10){
            this.platinum.weight = (Number(this.platinum.weight)*0.95).toFixed(3);
          } else if(this.selectedsize >= 15 && this.selectedsize <= 18){
            this.platinum.weight = (Number(this.platinum.weight)*1.07).toFixed(3);
          } else if(this.selectedsize >= 19 && this.selectedsize <= 22){
            this.platinum.weight = (Number(this.platinum.weight)*1.1).toFixed(3);
          }
        }else if(this.data.gender == 'Male'){
          if(this.selectedsize >= 14 && this.selectedsize <= 17){
            this.platinum.weight = (Number(this.platinum.weight)*0.95).toFixed(3);
          } else if(this.selectedsize >= 22 && this.selectedsize <= 25){
            this.platinum.weight = (Number(this.platinum.weight)*1.08).toFixed(3);
          } else if(this.selectedsize >= 26 && this.selectedsize <= 30){
            this.platinum.weight = (Number(this.platinum.weight)*1.12).toFixed(3);
          }  else if(this.selectedsize >= 31 && this.selectedsize <= 34){
            this.platinum.weight = (Number(this.platinum.weight)*1.15).toFixed(3);
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
      this.platinum.weight = (Number(this.platinum.weight) * a).toFixed(3);
    } else if (this.sizes && this.privious != this.selectedsize && this.data.jwellery_type == 'Chain') {
      
      let increament = this.selectedsize - this.defaultsize;
      increament = (Number(this.platinum.weight)/Number(this.defaultsize)) * increament;
      this.platinum.weight = (Number(this.platinum.weight) + increament).toFixed(3);
    }

    this.priceplat = this.pricelist.platinum.find(x => x.metrial_type == "Platinum");
      if(this.priceplat){
    this.totalplat = this.api.price(this.platinum.weight,this.priceplat.price,this.platinum.charges_option,this.platinum.making_charge,this.platinum.wastage,this.platinum.purity,this.platinum.meena_cost,this.platinum.meenacost_option);
    this.totalplat = this.totalplat.price;
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
            this.silver.weight = (Number(this.silver.weight)*0.95).toFixed(3);
          } else if(this.selectedsize >= 15 && this.selectedsize <= 18){
            this.silver.weight = (Number(this.silver.weight)*1.07).toFixed(3);
          } else if(this.selectedsize >= 19 && this.selectedsize <= 22){
            this.silver.weight = (Number(this.silver.weight)*1.1).toFixed(3);
          }
        }else if(this.data.gender == 'Male'){
          if(this.selectedsize >= 14 && this.selectedsize <= 17){
            this.silver.weight = (Number(this.silver.weight)*0.95).toFixed(3);
          } else if(this.selectedsize >= 22 && this.selectedsize <= 25){
            this.silver.weight = (Number(this.silver.weight)*1.08).toFixed(3);
          } else if(this.selectedsize >= 26 && this.selectedsize <= 30){
            this.silver.weight = (Number(this.silver.weight)*1.12).toFixed(3);
          }  else if(this.selectedsize >= 31 && this.selectedsize <= 34){
            this.silver.weight = (Number(this.silver.weight)*1.15).toFixed(3);
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
      this.silver.weight = (Number(this.silver.weight)*a).toFixed(3);
    }else if (this.sizes && this.privious != this.selectedsize  && this.data.jwellery_type == 'Chain') {
      
      let increament = this.selectedsize - this.defaultsize;
      increament = (Number(this.silver.weight)/Number(this.defaultsize)) * increament;
      this.silver.weight = (Number(this.silver.weight) + increament).toFixed(3);
    }


    this.pricesilver = this.pricelist.silver.find(x => x.type == "Silver");
     if(this.pricesilver) {
    this.totalsilver = this.api.price(this.silver.weight,this.pricesilver.price,this.silver.charges_option,this.silver.making_charge,this.silver.wastage,this.silver.purity,this.silver.meena_cost,this.silver.meenacost_option);
    this.totalsilver = this.totalsilver.price;
    this.total();
    this.grossweight();
    this.button();
  } else{
      this.button();
    }
  }
  }
  colorClarity(value0, value1,type=1) {
     if(type==1){

     
     if(value0 != 0)
     {
      this.defaultdiamond[0] = value0;
      this.diamondprice();
    }else if(value1 != 0){
      this.defaultdiamond[1] = value1;
      this.diamondprice();
    }

    }else if(type=2){
      if(value0 != 0)
     {
      this.defaultdiamond2[0] = value0;
      this.diamondprice(2);
    }else if(value1 != 0){
      this.defaultdiamond2[1] = value1;
      this.diamondprice(2);
    }
    }
  }
  diamondprice(type=1)  {
   if(type==1){
    for(let i=0;i < this.diamondclarity.length;i++){
      let name = this.defaultdiamond[0] + '/' +this.diamondclarity[i];
      if(this.diamondclarity[i] != this.defaultdiamond[1] ){
      let p = this.pricelist.diamond_master.filter(x => x.diamond_type == this.diamond.jwellery_size);
      p = p.find(x => x.type == name);
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
      if(p){
        this.discol[i] = 0;
      }else{
        this.discol[i] = 1;
      }
    }
    }
    let name = this.defaultdiamond[0] + '/' + this.defaultdiamond[1];
    this.pricediamond = this.pricelist.diamond_master.filter(x => x.diamond_type == this.diamond.jwellery_size);
    console.log(this.pricediamond);
    console.log(name);
    this.pricediamond = this.pricediamond.find(x => x.type == name);
    console.log(this.pricediamond);
    if (this.pricediamond)
    {
      this.totaldiamond = this.api.price(this.diamond.weight,this.pricediamond.price,'PerGram',0,0,0,0,"",this.diamond.crtcost_option,this.diamond.certification_cost);
      this.totaldiamond = this.totaldiamond.price;
    
    this.total();
    this.grossweight();
    this.button();
  } else  {
      this.button();
    }
    } else if(type ==2){
      for(let i=0;i < this.diamondclarity2.length;i++){
        let name = this.defaultdiamond2[0] + '/' +this.diamondclarity2[i];
        if(this.diamondclarity[i] != this.defaultdiamond[1] ){
        let p = this.pricelist.diamond_master.filter(x => x.diamond_type == this.diamond2.jwellery_size);
        p = p.find(x => x.type == name);
        
        if(p){
          this.discla2[i] = 0;
        }else{
          this.discla2[i] = 1;
        }}
      }
  
      for(let i=0;i < this.diamondcolour2.length;i++){
  
        let name = this.diamondcolour2[i] + '/' +this.defaultdiamond2[1];
  
        if(this.diamondcolour2[i] != this.defaultdiamond2[0] ){
        let p = this.pricelist.diamond_master.find(x => x.type == name);
        if(p){
          this.discol2[i] = 0;
        }else{
          this.discol2[i] = 1;
        }
      }
      }
      let name = this.defaultdiamond2[0] + '/' + this.defaultdiamond2[1];
      this.pricediamond2 = this.pricelist.diamond_master.filter(x => x.diamond_type == this.diamond2.jwellery_size);
      //console.log(this.)
      console.log(this.pricediamond2);
      this.pricediamond2 = this.pricediamond2.find(x => x.type == name);
      if (this.pricediamond2)
      {
        this.totaldiamond2 = this.api.price(this.diamond2.weight,this.pricediamond2.price,'PerGram',0,0,0,0,"",this.diamond2.crtcost_option,this.diamond2.certification_cost);
        this.totaldiamond2 = this.totaldiamond2.price;
      
      this.total();
      this.grossweight();
      this.button();
    } else  {
        this.button();
      }
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
    if (this.stone.length) {
      this.stone.forEach(child=>{
        weight = weight + Number(child.weight * 0.2);
      });
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
    if (this.pricediamond2) {
      price = price + this.totaldiamond2;
    }
    if (this.pricestone.length) {
      this.totalstone.forEach(childObj => {
      price = price + childObj;
      });
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
      this.drop = data;
     });
  }

}
