import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SEARCH } from 'src/config';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
data:any;
products:any;
url:any;
wish:any;
alert:boolean;
div:boolean;
loader:boolean;
page:boolean;
message:any="Nothing To Show";
drop:any;
@ViewChild('addclosebutton') addclosebutton;
@ViewChild('deleteclosebutton') deleteclosebutton;
  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router) { 
    this.drop=this.api.drop; 
    this.route.params.subscribe(params => {
      this.data=params.value;
      this.searchApi();
      });
  }
searchApi()
{
  this.loader=true;
    this.page=false;
  this.api.Post(SEARCH,{'name':this.data}).then(data=>{
    this.page=true;
      this.loader=false;
    this.alert=false;
    this.div=true;
    console.log(data);
    this.products = data['data'];
    console.log(this.products);
    this.url = data['url'] + '/';
  }).catch(d=>{
    this.page=true;
      this.loader=false;
    this.alert=true;
    this.div=false;
    console.log(d); 
  })
}
go(value) {
  this.api.godetail(value);
}
wishlist(pid) {
   if(this.drop==0)
     {
       this.api.setGoto();
       this.api.onSuccess('Please Login First to Continue');
     }
     else if(this.drop==1)
    {
      this.api.checkWishlist(pid);
    }
 }
 deleteWishlist(pid)
 {
     this.api.deleteWishlist(pid);
 }
 checkHeart(pid)
{

  
  this.wish = this.api.getWishlist();
  if (this.wish) {
          let result = this.wish.find(x => x.product_id === pid);
      
          if (result)
          { 
            return true;
          
          }
          else
          {
            return false;
            
          } 
    }
    else{
      return false;
    }
}

  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.getlogin.subscribe(data => {
      this.drop=data;
     });

  }

}
