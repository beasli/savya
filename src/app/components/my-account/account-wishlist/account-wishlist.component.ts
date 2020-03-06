import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { WISHLISTVIEW } from 'src/config';

@Component({
  selector: 'app-account-wishlist',
  templateUrl: './account-wishlist.component.html',
  styleUrls: ['./account-wishlist.component.css']
})
export class AccountWishlistComponent implements OnInit {
data:any;
uid:any;
value:any;
results:any;
baseurl:any;
div:boolean;
alert:boolean;
message:any;
  constructor(private api:ApiService) {
    this.data=this.api. getUserInfo();
    this.uid=this.data.uid;
    // console.log("uid"+this.uid);
    this.view();
     console.log(this.data);
    this.value=localStorage.getItem('wish');
  }
  view()
  {
    
    this.api.Post(WISHLISTVIEW,{uid:this.uid}).then(data=>{
      this.div=true;
      this.alert=false;
      // console.log(data['data']);
       this.baseurl=data['url']+"/";
      console.log("url"+this.baseurl);
       this.results=data['data'];
      // console.log(this.results);
     }).catch(d=>{
       this.alert=true;
       this.div=false;
       this.message=d.error.data; 
       console.log(d);
     })
    
  }
  deleteWishlist(pid)
  {
  
      this.api.deleteWishlist(pid);
     
  }

  ngOnInit() {

    this.api.getWish.subscribe(data=>{
      this.view();
       console.log("getWishSubscribe"+data);
       }) 
    
  }
  

}
