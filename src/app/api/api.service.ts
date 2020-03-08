import { Router } from '@angular/router';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl, WISHLISTVIEW, WISHLISTADD, WISHLISTDELETE, CARTADD } from '../../config';
import * as CryptoJS from 'crypto-ts';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() getlogin:EventEmitter<string> = new EventEmitter();
  @Output() getWish:EventEmitter<string> = new EventEmitter();
  @Output() getUserData:EventEmitter<string> = new EventEmitter();
  drop:any;
  otp:any;
  otpGuard:any;
  uid:any;
  wish:any[];
  event:any;
  
  constructor(public http: HttpClient, private router: Router) {
    if(localStorage.getItem('savya_userInfo'))
    {
     let u=this.getUserInfo();
    this.uid=u.uid;
   }
    // console.log("userid"+this.uid);
    
    if (localStorage.getItem('drop')) {
      this.drop =  +this.decrypt((localStorage.getItem('drop')));
    } else {
      this.drop = 0;
    }

 }

   public setEvent(value, url) {
     this.event = value;
     this.event['url'] = url;
     localStorage.setItem('event', JSON.stringify(this.event));
     this.router.navigate(['/event']);
   }

   public getEvent() {
    return localStorage.getItem('event');
  }

  public Get(api) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + api)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public Post(api, formData) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + api, formData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
    
  public Post2(api, formData) {
    return new Promise((resolve, reject) => {
      this.http.post(api, formData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public Get2(api) {
    return new Promise((resolve, reject) => {
      this.http.get(api)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  updateWishlist()
  {
    this.Post(WISHLISTVIEW,{uid:this.uid}).then(data=>{
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
      this.Post(WISHLISTDELETE,{uid:this.uid,product_id:pid}).then(data=>{
        console.log(data);
       this.updateWishlist();
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
              this.Post(WISHLISTADD,{uid:this.uid,product_id:pid}).then(data=>{
                console.log(data);
                   this.updateWishlist();
              }).catch(d=>{
                console.log(d);
              })
            } 
      }
      else{
        this.Post(WISHLISTADD,{uid:this.uid,product_id:pid}).then(data=>{
          console.log(data);
             this.updateWishlist();
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
   this.setMobileNo(value.mobile_no);
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
    return d;
  }
  logout()
  {
      localStorage.removeItem('savya_userInfo');
      localStorage.removeItem('token');
      localStorage.removeItem('wishlist');
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

}
