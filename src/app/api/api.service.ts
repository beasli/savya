import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../config';
import * as CryptoJS from 'crypto-ts';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) {
   }
   public testcrypt(data) {
   let enc = this.encrypt(data);
   console.log("ENC===>"+enc);
   let dec = this.decrypt(enc);
   console.log(dec);
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
}
