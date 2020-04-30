import { Router } from '@angular/router';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl, WISHLISTVIEW, WISHLISTADD, WISHLISTDELETE, CARTADD, CARTVIEW, CARTDELETE, CARTUPDATE, ORDERHISTORY, PROFILEVIEW } from '../../config';
import * as CryptoJS from 'crypto-ts';
import { JsonPipe } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';


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
  event:any;
  header:any;
  
  
  constructor(public http: HttpClient,private service: NotificationsService, private router: Router) {
    if(localStorage.getItem('savya_userInfo'))
    {
     let u=this.getUserInfo();
    this.uid=u.id;
    console.log(this.uid);
   }
    // console.log("userid"+this.uid);
    if(this.getMobileNo())
    {
      console.log("if condition");
      this.updateCart();
      this.updateWishlist();
      this.updateOrderHistory();
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
    console.log({headers:this.header});


 }

  public Get(api) {
    this.header = new HttpHeaders().set(
      "Authorization",
       'Bearer'+" "+this.getMobileNo()
    );
   // console.log(this.header);
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
    console.log(this.header);
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

  updateOrderHistory()
  {
    this.Post(ORDERHISTORY,{user_id:this.uid}).then(data=>{
      console.log( data);
      localStorage.setItem('orders',JSON.stringify(data['data']));  
    }).catch(d=>{
      console.log(d);
      localStorage.removeItem('orders');
    })
  }

  onSuccess(message){
    this.service.success('Success',message,{
     position: ['bottom', 'right'],
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  onFail(message){
    this.service.warn('Not Possible',message,{
     position: ['bottom', 'right'],
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
 
  
//cart functions

  updateCart()
  {
    //console.log("in update cart function")
    this.Get(CARTVIEW+"?user_id="+this.uid).then(data=>{
      //console.log(data['data'][0].cart_id);
      console.log( data);
      localStorage.setItem('cart',JSON.stringify(data));  
    }).catch(d=>{
      console.log(d);
      localStorage.removeItem('cart');
      this.Cart.emit("emptycart"+Date.now());
    })
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
                      console.log(data);
                      this.updateCart(); 
                      this.Cart.emit("cartUpdate"+Date.now()); 
                    }).catch(d=>{
                      console.log(d);
                    })
                }
            } 
     }
}

  deleteCart(pid)
  {
    console.log(pid)
    if(localStorage.getItem("waste")!=null)
    {
      let waste = JSON.parse(localStorage.getItem("waste"));
      delete waste[pid];
      localStorage.setItem("waste",JSON.stringify(waste));
   }
   if(localStorage.getItem("prd_sizes")!=null)
   {
    let prd_sizes = JSON.parse(localStorage.getItem("prd_sizes"));
    delete prd_sizes[pid];
    localStorage.setItem("prd_sizes",JSON.stringify(prd_sizes));
   }
    this.Delete(CARTDELETE+"?cart_id="+pid.cart_id+"&user_id="+this.uid).then(data=>{
      //console.log("deletecart"+data)
      this.updateCart();
      this.Cart.emit("cartUpdated"+Date.now());
      this.onSuccess('Product Successfully Removed from the cart');
     
    }).catch(d=>{
      this.updateCart();
      console.log(d);
      this.Cart.emit("cartUpdated"+Date.now());
     
    })
    
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
      console.log(d);
      this.Cart.emit("cartUpdated"+Date.now());
      
    })
  }



//wishlist functions


  godetail(value) {
    if (value >= 0) {
       this.router.navigate(['/product-details', value]);
             }
            }
  updateWishlist()
  {
    this.Get(WISHLISTVIEW).then(data=>{
      console.log(data);
      localStorage.setItem('wishlist',JSON.stringify(data));
     
    }).catch(d=>{
      console.log(d);
      //console.log("deleteWishllist"+d.error.data);
      localStorage.removeItem('wishlist');
      this.getWish.emit("emptyWishlist"+Date.now());
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
        console.log(d);
      
      })
     
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
                console.log(d);
              })
            } 
      }
      else{
        this.Post(WISHLISTADD,{product_id:pid}).then(data=>{
          console.log(data);
             this.updateWishlist();
             this.onSuccess('Product Successfully added to the Wishlist');
        }).catch(d=>{
          console.log(d);
        })
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
   // console.log(JSON.stringify(data));
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
   // let e=this.encrypt(value.mobile_no);
    localStorage.setItem('token',value);
              // var encrypted = CryptoJS.AES.encrypt(
              //   value,
              //   'test',
              //   {
              //     mode: CryptoJS.mode.CBC,
              //     padding: CryptoJS.pad.PKCS7
              //   }
              // );
  }
  getMobileNo()
  {
    let m=localStorage.getItem('token');
    // let d =this.decrypt(m);
    //  return d;
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
    console.log(d);
    return d;
  }
  logout()
  {
      localStorage.removeItem('savya_userInfo');
      localStorage.removeItem('token');
      localStorage.removeItem('wishlist');
      localStorage.removeItem('cart');
      localStorage.removeItem('orders');
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
   // console.log("apiservice"+this.otpGuard);
}
getOtpGuard()
{
  //console.log("apiservice"+this.otpGuard);
    return this.otpGuard;
    
}

price(weight, rate, option, makingcharge, wastage = 0, value = 0) {
  let metalprice = 0;
  if  (option == "PerGram") {
      metalprice  =  (Number(rate) + Number(makingcharge)) * Number(weight);
  } else if (option == "Percentage") {
  weight = ((Number(makingcharge) + Number(value)) / 100) * Number(weight);
  metalprice = Number(rate) * weight;
  } else if (option == "Fixed") {
      metalprice = Number(weight) * Number(rate) + Number(makingcharge);
  }
  if (wastage != 0) {
    let wasteprice = ((Number(weight) / 100) *  Number(wastage)) * Number(rate);
    metalprice = metalprice + wasteprice;
 }
  let data = {'weight': weight,'price': metalprice};
  return data;
}
setfilter(value)
{
  localStorage.setItem('filter',JSON.stringify(value));
  this.filterChange.emit("cartUpdate"+Date.now()); 
}
getfilter()
{
  return JSON.parse(localStorage.getItem('filter'));
}

}
