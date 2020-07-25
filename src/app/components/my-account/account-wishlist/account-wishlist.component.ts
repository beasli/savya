import { Router } from '@angular/router';
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
loader:boolean;
page:boolean;
  constructor(private api:ApiService,private router:Router) {
    this.view();
    this.value=localStorage.getItem('wish');
  }


  removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].product_type === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }



  view()
  {
    
    this.api.Get(WISHLISTVIEW).then(data=>{
      this.page=true;
      this.loader=false;
      this.div=true;
      this.alert=false;
       this.baseurl=data['url']+"/";
       this.results=data['data'];
       this.results = this.removeItemAll(this.results,'Machinery')
         
     }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{
      this.page=true;
      this.loader=false;
       this.alert=true;
       this.div=false;
       this.message=d.error.data; 
       }
     });


    


    
  }
  deleteWishlist(pid)
  {
    this.loader=true;
    this.page=false;
      this.api.deleteWishlist(pid);
      this.page=true;
      this.loader=false;
  }
  
  go(value) {
    this.api.godetail(value);
  }
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.getWish.subscribe(data=>{
      this.view();
       }) 
    
  }
  

}
