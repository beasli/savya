import { Component, OnInit } from '@angular/core';
import { NAVIGATION, CARTVIEW } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  url: any;
  catall = [];
  catwithsub = [];
  catwithoutsub = [];
  uid:any;
  results:any[];
  alert:boolean=false;
  div:boolean=false;
  baseurl:any;
  message:any="CART IS EMPTY";
  constructor(private api: ApiService ) {
    
                  //cart work start //
                  this.uid=this.api.uid;
                  console.log("userid"+this.uid); 

                  this.view();
                  //cart work end//
          
            this.api.Post(NAVIGATION, {}).then(data => {
              this.catall = data['data'];
              this.catall.forEach(element => {
                if (element['subcategory'].length){
                  this.catwithsub.push(element);
                }
                else {
                  this.catwithoutsub.push(element);
                }
                }
              );
              // console.log(this.catwithsub[0].subcategory);
              // console.log(this.catwithoutsub);
            });
}
ProductsInCart()
{
  let cart=this.api.getCart();
  if(cart)
  {
    return (cart.length);
  }
  else
  {
    return (0);
  }
}
  deleteCart(pid)
  {
    this.api.deleteCart(pid);
  }
  view()
  {
      this.api.Post(CARTVIEW,{user_id:this.uid}).then(data=>{
        console.log(data);  
        this.baseurl=data['url']+"/";
        this.results=data['data'];
        this.alert=false;
        this.div=true;
      
      }).catch(d=>{
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
  this.api.Cart.subscribe(data=>{
    this.view();
    console.log("changed");
     console.log("getWishSubscribe"+data);
     }) 
  
}

}
