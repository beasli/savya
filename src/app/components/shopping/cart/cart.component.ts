import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CARTVIEW } from 'src/config';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
uid:any;
results:any[];
alert:boolean;
div:boolean;
baseurl:any;
message:any="CART IS EMPTY";
loader:boolean;
page:boolean;
  constructor(private api:ApiService) {
        this.uid=this.api.uid;
        console.log("userid"+this.uid); 

        this.view();
   }
   go(value) {
    this.api.godetail(value);
  }
   deleteCart(pid)
   {
     this.api.deleteCart(pid);
   }
   view()
   {
        this.api.Post(CARTVIEW,{user_id:this.uid}).then(data=>{
          console.log(data);
          this.page=true;
          this.loader=false;
          this.baseurl=data['url']+"/";
          this.results=data['data'];
          this.alert=false;
          this.div=true;
        
        }).catch(d=>{
          this.page=true;
         this.loader=false;
          this.div=false;
          this.alert=true;
          console.log(d);
        })
   }
   checkCart(pid)
   {
       let check=this.api.checkCart(pid);
      // console.log(check);
       return check;
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
   qtyUpdate(pid,value)
   {
        this.api.qtyUpdate(pid,value);
   }
  
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.Cart.subscribe(data=>{
      this.view();
       console.log("getWishSubscribe"+data);
       }) 
    
  }
  

}
