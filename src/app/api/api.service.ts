import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../config';
import * as CryptoJS from 'crypto-ts';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() getlogin:EventEmitter<string> = new EventEmitter();
  drop:any;
  constructor(
    public http: HttpClient
  ) {
    if (localStorage.getItem('drop')) {
      this.drop =  +this.decrypt((localStorage.getItem('drop')));
    } else {
      this.drop = 0;
    }
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

  public encrypt(data) {
    console.log(JSON.stringify(data));
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
  setlogin(value)
{
        let e=this.encrypt(value);
        localStorage.setItem('drop',e);
        this.drop=this.decrypt(e);
      this.getlogin.emit(this.drop);
}
  getUserInfo()
  {
    let d =this.decrypt(localStorage.getItem('savya_userInfo'))
    return d;
  }
  logout()
  {
      localStorage.removeItem('savya_userInfo');
  }

}
