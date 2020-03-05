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
      // console.log(data['data']);
       this.baseurl=data['url']+"/";
      console.log("url"+this.baseurl);
       this.results=data['data'];
       console.log(this.results);
     }).catch(d=>{
       console.log(d);
     })
    
  }
  deleteWishlist(pid)
  {
  
      this.api.deleteWishlist(pid);
      this.api.getWish.emit('wishlist-updated');
    // this.api.setWish(0);
     
  }

  ngOnInit() {

    this.api.getWish.subscribe(data=>{
    this.api.updateWishlist();
    }) 
    
  }
  

}
