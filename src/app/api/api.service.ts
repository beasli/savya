import { LoginModalComponent } from './../components/site/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl, WISHLISTVIEW, WISHLISTADD, WISHLISTDELETE, CARTADD, CARTVIEW, CARTDELETE, CARTUPDATE, ORDERHISTORY, PROFILEVIEW, NAVIGATION } from '../../config';
import * as CryptoJS from 'crypto-ts';
import { JsonPipe } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() getlogin:EventEmitter<number> = new EventEmitter();
  @Output() getWish:EventEmitter<string> = new EventEmitter();
  @Output() getUserData:EventEmitter<string> = new EventEmitter();
  @Output() Cart:EventEmitter<string> = new EventEmitter();
  @Output() filterChange:EventEmitter<string> = new EventEmitter();
  @Output() changelogo:EventEmitter<number> = new EventEmitter();

  drop:any;
  otp:any;
  otpGuard:any;
  uid:any;
  wish:any[];
  filter:any;
  event:any;
  header:any;
  machineurl:any;
  goto:any;
  cat: any;
  // geocoder = new google.maps.Geocoder();
  constructor(public http: HttpClient,private service: NotificationsService, private router: Router,private modalService: NgbModal) {
    this.category();
    this.filter = {"menu":{"jewelery_for":[],"jewelery_type":[],"material":[],"price":{},"purity":[]}};
    if(localStorage.getItem('savya_userInfo'))
    {
     let u=this.getUserInfo();
    this.uid=u.id;
   }
    if (localStorage.getItem('drop')) {
      this.drop =  +this.decrypt((localStorage.getItem('drop')));
    } else {
      this.drop = 0;
    }

    this.header = new HttpHeaders().set(
      "Authorization",
       'Bearer'+" "+this.getMobileNo()
    );
    if(this.drop == 0 ){
      let count = 1;
      const cell = this;
      setInterval(function(){ 
     //   debugger
        count ++;
        if(count==3){
          clearInterval();
          cell.modalService.open(LoginModalComponent,{ windowClass: 'myCustomModalClass2',backdrop : 'static',
          keyboard : false})
        }
      }
      , 10000);
     
   //   this.modalService.open(LoginComponent)
    }
      this.getlogin.subscribe(data=>{
        if(this.drop==1)
        {
          if(localStorage.getItem('savya_userInfo'))
          {
            this.updateCart();
            this.updateWishlist();
            this.updateOrderHistory();
          }
      
        }
      
        
      })

 }





 public Post2(api, formData,parameters?) {
  return new Promise((resolve, reject) => {
    this.http.post(apiUrl + api, formData,  {headers:this.header,params:parameters})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

  public Get(api) {
    this.header = new HttpHeaders().set(
      "Authorization",
       'Bearer'+" "+this.getMobileNo()
    );
   
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + api,  {headers:this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public Delete(api){
    return new Promise((resolve, reject) => {
      this.http.delete(apiUrl + api,  {headers:this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public Put2(api, formData,parameters={}){
    this.header = new HttpHeaders().set(
      "Authorization",
       'Bearer'+" "+this.getMobileNo()
    );
   
    return new Promise((resolve, reject) => {

      let options = { headers: this.header ,params:parameters};

      this.http.put(apiUrl + api+formData,formData,options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public Post(api, formData) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + api, formData,  {headers:this.header})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public Put(api, formData,parameters={}) {
    return new Promise((resolve, reject) => {

      let options = { headers: this.header ,params:parameters};

      this.http.put(apiUrl + api+'/'+formData,formData,options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  public delete(api, formData) {
    return new Promise((resolve, reject) => {

      let options = { headers: this.header};

      this.http.delete(apiUrl + api+'/'+formData,options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  setGoto(){
    this.goto = this.router.url;
  }

  getGoto(){
    if(this.goto){
      this.router.navigate([this.goto]);
    }
    this.goto = null;
  }

  updateOrderHistory()
  {
    this.Post(ORDERHISTORY,{user_id:this.uid}).then(data=>{
      console.log( data);
      localStorage.setItem('orders',JSON.stringify(data['data']));  
    }).catch(d=>{
      if(d.status == 503){
        this.onFail('Your session is expired please login again');
        this.setGoto();
        this.setlogin(0);
        this.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
      console.log(d);
      localStorage.removeItem('orders');}
    });
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  onSuccess(message){
    this.service.success('Success',message,{
      position:["bottom","left"],
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  onFail(message){
    this.service.warn('Not Possible',message,{
      position:["bottom","left"],
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
 
  updateCart()
  {
    if(localStorage.getItem('savya_userInfo'))
    {
     let u=this.getUserInfo();
    this.uid=u.id;
    this.Get(CARTVIEW+"?user_id="+this.uid).then(data=>{
 
      localStorage.setItem('cart',JSON.stringify(data));  
    }).catch(d=>{
      if(d.status == 503){
        
      } else{
      localStorage.removeItem('cart');
      this.Cart.emit("emptycart"+Date.now());}
     })
    
   }
   
  }
  checkCart(pid)
  { 
    //console.log("pid =" + pid)
        let cart=this.getCart();
       // console.log(cart);
        if(cart)
        {
                let result=cart.find(x => x.product_id == pid);
                
             // console.log(result);
                if(result)
                { 
               //  console.log("present");
                  return true;
                
                }
                else
                {
               // console.log("inner else not present");
                  return false;
                  
                } 
          }
          else{
           // console.log(" external else not present");
            return false;
          }
  }
getCart()
{
  let m=localStorage.getItem('cart');
  if(m)
  {
    let n=JSON.parse(localStorage.getItem('cart'));
    n['data'] = n['data'].filter((v,i,a)=>a.findIndex(t=>(t.cart_id === v.cart_id))===i);
    return n['data'];
  }
  else{
    return null;
  }
}
qtyUpdate(pid,value)
{
  console.log("in qtyupdate function");
  console.log("value="+value);
   let cart=this.getCart();
   if(cart)
   {
           let result=cart.find(x => x.product_id == pid);
           console.log(result);
           if(result)
           { 
                let cartId=result.cart_id;
                let c=Number(result.count);
               
                if(c==1&&value==-1)
                {
                  this.deleteCart(pid);
                }
                else
                {
                      c=c+value;
                   // this.Put2(CARTUPDATE+"?cart_id="+cartId+"&user_id="+this.uid+"&count="+c).then(data=>{
                     this.Put2(CARTUPDATE,"",{cart_id:cartId,user_id:this.uid,count:c}).then(data=>{
                      
                      this.updateCart(); 
                      this.Cart.emit("cartUpdate"+Date.now()); 
                    }).catch(d=>{
                      if(d.status == 503){
                        this.onFail('Your session is expired please login again');
                        this.setGoto();
                        this.setlogin(0);
                        this.logout();
                        setTimeout(() => {
                        this.router.navigate(['/']);
                        },1000);
                      } else{console.log(d)}
                    });
                }
            } 
     }
}

  deleteCart(pid)
  {
    this.Delete(CARTDELETE+"?cart_id="+pid+"&user_id="+this.uid).then(data=>{
      //console.log("deletecart"+data)
      this.updateCart();
      this.Cart.emit("cartUpdated"+Date.now());
      this.onSuccess('Product Successfully Removed from the cart');
     
    }).catch(d=>{
      if(d.status == 503){
        this.onFail('Your session is expired please login again');
        this.setGoto();
        this.setlogin(0);
        this.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
      this.updateCart();
      console.log(d);
      this.Cart.emit("cartUpdated"+Date.now());}
     
    });
    
  }
  addToCart(product)
  {
   console.log(product);
    this.Post(CARTADD, product).then(data=>{
      console.log(data);
      this.updateCart();
      this.Cart.emit("cartUpdated"+Date.now());
      
    this.onSuccess('Product Successfully added to the cart');
    //  localStorage.setItem('cart',JSON.stringify(data));  
    }).catch(d=>{
      if(d.status == 503){
        this.onFail('Your session is expired please login again');
        this.setGoto();
        this.setlogin(0);
        this.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
      console.log(d);
      this.Cart.emit("cartUpdated"+Date.now());
      }      
    });
  }



//wishlist functions


  godetail(value) {
    if (value >= 0) {
     // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/product-details'],{queryParams:{'detail':value}});
     //   });
             }
            }

    replacespace(value){
      value.replace(/ /g, "-");
      return value;
    }
    backspace(value){
      value.replace(/ /g, "-");
      return value;
    }
  updateWishlist()
  {
    this.Get(WISHLISTVIEW).then(data=>{
      console.log(data);
      localStorage.setItem('wishlist',JSON.stringify(data));
     
    }).catch(d=>{

      if(d.status == 503){
        this.onFail('Your session is expired please login again');
        this.setGoto();
        this.setlogin(0);
        this.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
        console.log(d);
        //console.log("deleteWishllist"+d.error.data);
      localStorage.removeItem('wishlist');
      this.getWish.emit("emptyWishlist"+Date.now())
      }
      ;
    })
  }

  deleteWishlist(pid)
  {
      console.log("wishlistdeletefunction")
    
      this.Delete(WISHLISTDELETE+"/"+pid).then(data=>{
        console.log(data);
       this.updateWishlist();
       this.onSuccess('Product Successfully Removed from the Wishlist');
       this.getWish.emit("wishlist updated"+Date.now());
      }).catch(d=>{
        if(d.status == 503){
          this.onFail('Your session is expired please login again');
          this.setGoto();
          this.setlogin(0);
          this.logout();
          setTimeout(() => {
          this.router.navigate(['/']);
          },1000);
        } else{
         console.log(d);}
       });
     
  }
 
checkWishlist(pid)
{
   // console.log("check"+pid); 
  
    this.wish=this.getWishlist();
    if(this.wish)
    {
            let result=this.wish.find(x => x.product_id === pid);
        //  console.log("result="+result);
            if(result)
            {
              console.log("product already exist ");
            }
            else
            {
              this.Post(WISHLISTADD,{product_id:pid}).then(data=>{
                console.log(data);
                   this.updateWishlist();
                   this.onSuccess('Product Successfully added to the Wishlist');
              }).catch(d=>{
                if(d.status == 503){
                  this.onFail('Your session is expired please login again');
                  this.setGoto();
                  this.setlogin(0);
                  this.logout();
                  setTimeout(() => {
                  this.router.navigate(['/']);
                  },1000);
                } else{
                 console.log(d);}
               });
            } 
      }
      else{
        this.Post(WISHLISTADD,{product_id:pid}).then(data=>{
          console.log(data);
             this.updateWishlist();
             this.onSuccess('Product Successfully added to the Wishlist');
        }).catch(d=>{
          if(d.status == 503){
            this.onFail('Your session is expired please login again');
            this.setGoto();
            this.setlogin(0);
            this.logout();
            setTimeout(() => {
            this.router.navigate(['/']);
            },1000);
          } else{
           console.log(d);}
         });
      }
}
getWishlist()
{
  let m=localStorage.getItem('wishlist');
  if(m)
  {
    let n=JSON.parse(localStorage.getItem('wishlist'));
    return n['data'];
  }
  else{
    return null;
  }
  
}



  public encrypt(data) {
  
   const encryptedMessage = CryptoJS.AES.encrypt(JSON.stringify(data), 'test').toString();
   return encryptedMessage;
  }

  public decrypt(data) {
    const decryptedMessage = CryptoJS.AES.decrypt(data, 'test');
    return JSON.parse(decryptedMessage.toString(CryptoJS.enc.Utf8));
   }

  setUserInfo(value)
  {
   let e=this.encrypt(value);
    localStorage.setItem('savya_userInfo',e);
   
  }
  setMobileNo(value)
  {
    localStorage.setItem('token',value);
  }
  getMobileNo()
  {
    let m=localStorage.getItem('token');
    return m;
  }

  changelg(number:number){
    this.changelogo.emit(number);
  }
  setlogin(value)
{
        let e=this.encrypt(value);
        localStorage.setItem('drop',e);
        this.drop=this.decrypt(e);
      this.getlogin.emit(this.drop);
}
  getUserInfo()
  {
    let d =this.decrypt(localStorage.getItem('savya_userInfo'));
    // console.log(d);
    return d;
  }

  public dismissModel(){
    this.modalService.dismissAll();
  }

  logout()
  {
    this.header = null;
      localStorage.removeItem('savya_userInfo');
      localStorage.removeItem('token');
      localStorage.removeItem('wishlist');
      localStorage.removeItem('cart');
      localStorage.removeItem('orders');
      if(this.drop == 0 ){
        let count = 1;
        const cell = this;
        setInterval(function(){ 
       //   debugger
          count ++;
          if(count==3){
            clearInterval();
            cell.modalService.open(LoginModalComponent,{ windowClass: 'myCustomModalClass2',backdrop : 'static',
            keyboard : false})
          }
        }
        , 1000);
       
     //   this.modalService.open(LoginComponent)
      }
  }
setOtp(value)
{
 this.otp=value;
}
getOtp()
{
  return this.otp;
}
setOtpGuard(value)
{
    this.otpGuard=value;
}
getOtpGuard()
{
    return this.otpGuard;
    
}
calculate(products){
  let priceWeight = [];
  products.forEach(childObj => {
  let gold = childObj.assests.find(slide => slide.metal === 'Gold');
  let silver = childObj.assests.find(slide => slide.metal === 'Silver');
  let stone = childObj.assests.filter(slide => slide.metal === 'Stone');
  let diamond = childObj.assests.filter(slide => slide.metal === 'Diamond');
  let platinum = childObj.assests.find(slide => slide.metal === 'Platinum');
  let price = childObj.price;
  let weight = 0;
  let priceProduct = 0;
  let making = 0;
  let goldweight;

  if(gold)  {
      if(gold.options == 'Percentage'){
        let pricegold = price.gold.find(x => x.type == '24KT');
        let value = price.gold.find(x => x.type == gold.materialType);
        value = value.value_in;
        let outcome = this.price(gold.weight,pricegold.price,gold.options,gold.makingCharge,gold.wastage,value,gold.meena_cost,gold.meenacost_option);
            weight += Number(gold.weight);
            goldweight = Number(outcome.weight);
            priceProduct += outcome.price;
            making += Number(outcome.making_charge);
      } else {
        let pricegold = price.gold.find(x => x.type == '24KT');
        let value = price.gold.find(x => x.type == gold.materialType);
        value = value.value_in;
        let outcome = this.price(gold.weight,pricegold.price,gold.options,gold.makingCharge,gold.wastage,value,gold.meena_cost,gold.meenacost_option);
        weight += Number(outcome.weight2);
        goldweight = Number(outcome.weight);
        priceProduct += outcome.price;
        making += Number(outcome.making_charge);
      }
  }
  if(silver)  {
    let pricesilver = price.silver.find(x => x.type == silver.materialType);
    let outcome = this.price(silver.weight,pricesilver.price,silver.options,silver.makingCharge,silver.wastage,silver.purity,silver.meena_cost,silver.meenacost_option);
    weight += Number(outcome.weight2);
    priceProduct += outcome.price;
    making += Number(outcome.making_charge);
  }
  if(stone.length)  {
    stone.forEach(element => {
      
    console.log(element);
    let pricestone = price.stone.find(x => x.type.toUpperCase() == element.materialType.toUpperCase());
    let outcome = this.price(element.weight,pricestone.price,'PerGram',0);
    weight += Number(outcome.weight2)*0.2;
    priceProduct += outcome.price;
    making += Number(outcome.making_charge);
  });
  }
  if(diamond[0])  {
    let pricediamond = price.diamond_master.filter(x => x.diamond_type == diamond[0].diamondType);
    pricediamond = price.diamond_master.find(x => x.type == diamond[0].materialType);
    let outcome = this.price(diamond[0].weight,pricediamond.price,'PerGram',0,0,0,0,"",diamond[0].crtcost_option,diamond[0].certification_cost);
    weight += Number(outcome.weight2)*0.2;
    priceProduct += outcome.price;
    making += Number(outcome.making_charge);
  }
  if(diamond[1])  {
    let pricediamond = price.diamond_master.filter(x => x.diamond_type == diamond[1].diamondType);
    pricediamond = pricediamond.find(x => x.type == diamond[1].materialType);
    let outcome = this.price(diamond[1].weight,pricediamond.price,'PerGram',0,0,0,0,"",diamond[1].crtcost_option,diamond[1].certification_cost);
    weight += Number(outcome.weight2)*0.2;
    priceProduct += outcome.price;
    making += Number(outcome.making_charge);
  }
  if(platinum)  {
    let priceplatinum = price.platinum.find(x => x.metrial_type == platinum.materialType);
    let outcome = this.price(platinum.weight,priceplatinum.price,platinum.options,platinum.makingCharge,platinum.wastage,platinum.purity,platinum.meena_cost,platinum.meenacost_option);
    weight += Number(outcome.weight2);
    priceProduct += outcome.price;
    making += Number(outcome.making_charge);
  }
   if(gold){
    let data = {'weight':weight.toFixed(3),'price':priceProduct,'goldcat':gold.materialType,'goldweight':goldweight,'making':making};
    priceWeight.push(data);
    } else{
      let data = {'weight':weight.toFixed(3),'price':priceProduct,'goldcat':null,'goldweight':goldweight,'making':making};
      priceWeight.push(data);
    }
   
  });
  return priceWeight;
}

price(weight, rate, option, makingcharge, wastage = 0, value = 0,meenacost=0,meenatype="",certificatetype="",certificatecost=0) {
  let metalprice = 0;
  let making = 0;
  if (option == "Percentage") {
    wastage += makingcharge;
  } 

  if (wastage != 0 || value !=0) {

    if(wastage !=0 && value !=0){
      rate = ((Number(wastage) + Number(value)) / 100) * Number(rate);
    }else if(value != 0){
      rate = (Number(value) / 100) * Number(rate);
    }else{
      rate = (Number(wastage) / 100) * Number(rate);
    }
 }

  if  (option == "PerGram") {
      metalprice  =  (Number(rate) + Number(makingcharge)) * Number(weight);
      making = Number(makingcharge) * Number(weight);
  }
  else if (option == "Fixed" || option == "Percentage") {
      metalprice = Number(weight) * Number(rate) + Number(makingcharge);
      making = Number(makingcharge);
  }
 if(meenatype == "PerGram"){
  metalprice += Number(weight) * Number(meenacost);
 }else if(meenatype == "Fixed"){
  metalprice += Number(meenacost);
 }

 if(certificatetype == "PerCarat"){
  metalprice += Number(weight) * Number(certificatecost);
 }else if(certificatetype == "Fixed"){
  metalprice += Number(certificatecost);
 }
 let weight2=weight;
 if(value!=0){
 weight = (Number(value) / 100) *Number(weight);
 console.log(weight);
 }
  let data = {'weight': weight,'weight2':weight2,'price': metalprice,'making_charge':making};
  return data;
}
setfilter(value)
{
  
  this.filter = value;
  this.filterChange.emit("filterchanged"+Date.now()); 
}
getfilter()
{
  return this.filter;
  
}

category(){
  this.Get(NAVIGATION).then(data => {
    this.cat = data['data'];
  });
}
}
