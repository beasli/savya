import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../config';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) { }

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
}
