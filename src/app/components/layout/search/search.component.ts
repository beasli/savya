import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute } from '@angular/router';
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
message:any="Nothing To Show";
  constructor(private api:ApiService,private route:ActivatedRoute) { 
    this.route.params.subscribe(params => {
      console.log(params.value);
      this.data=params.value;
      this.searchApi();
      });
  }
searchApi()
{
  this.api.Post(SEARCH,{name:this.data}).then(data=>{
    this.alert=false;
    this.div=true;
    console.log(data);
    this.products = data['data'];
    console.log(this.products);
    this.url = data['url'] + '/';
  }).catch(d=>{
    this.alert=true;
    this.div=false;
    console.log(d); 
  })
}
go(value) {
  this.api.godetail(value);
}
checkCart(pid)
{
    let check=this.api.checkCart(pid);
   // console.log(check);
    return check;
}
qtyUpdate(pid,value)
{
    this.api.qtyUpdate(pid,value);
}
quantity(pid)
{
    let cart=this.api.getCart();
    if(cart)
  {
          let result=cart.find(x => x.product_id == pid);
          // console.log(result);
          if(result)
          { 
                let cartId=result.cart_id;
                let c=Number(result.count);
                return c;
            } 
            else{
              return(0);
            }
    }
}
wishlist(pid) {
  // console.log("in wishlist");
   //console.log(pid);
   this.api.checkWishlist(pid);
 }
 deleteWishlist(pid)
 {
     this.api.deleteWishlist(pid);
 }
 checkHeart(pid)
{

  //console.log("checkheart");
  this.wish = this.api.getWishlist();
  if (this.wish) {
          let result = this.wish.find(x => x.product_id === pid);
      //  console.log("result="+result);
          if (result)
          { 
           // console.log("present");
            return true;
          
          }
          else
          {
            //console.log("not present");
            return false;
            
          } 
    }
    else{
      //console.log("not present");
      return false;
    }
}
  ngOnInit(): void {
  }

}
