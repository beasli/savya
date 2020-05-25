import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CARTVIEW, IMAGE, CARTUPDATE } from 'src/config';

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
baseurl= IMAGE+"/product/";
message:any="CART IS EMPTY";
loader:boolean;
page:boolean;
priceWeight:any;
final:any;
disamt: any;
realFinal:any;
totalw:any;
total = {'weight':0,'price':0,'making_charges':0};
products: any;
  constructor(private api:ApiService,private router:Router) {
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
          this.total['weight'] = 0;
          this.total['price'] = 0;
          this.total['making_charges'] = 0;
          this.api.Get(CARTVIEW+"?user_id="+this.uid).then(data=>{
          // console.log(this.total);
          // this.products=data['data'];
          // this.priceWeight = this.api.calculate(this.products);
          // let i = 0;
          // if(this.priceWeight){
          //   this.total = {'weight':0,'price':0,'making_charges':0};
          //    console.log(this.total);
          //    this.priceWeight.forEach(element => {
          //      console.log(this.products[i].count);

          //    this.total.price +=element.price*this.products[i].count;
          //    this.total.weight +=element.weight*this.products[i].count;
          //    this.total.making_charges +=element.making*this.products[i].count;
          //    i +=1;
          //  });}
          //  this.totalw = this.total.weight.toFixed(2); 
          //   console.log(this.total);
          //   this.final = this.total.price + this.total.price*0.045;
          //   this.realFinal = this.final;
          this.page=true;
          this.loader=false;
          this.results=data['data'];
          this.alert=false;
          this.div=true;
        
        }).catch(d=>{
          if(d.status == 401 || d.status == 503){
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
          this.div=false;
          this.alert=true;
          console.log(d);}
        })
   }
   checkCart(pid)
   {
       let check=this.api.checkCart(pid);
      // console.log(check);
       return check;
  }
   quantity(cart_id)
   {
        let cart=this.api.getCart();
        if(cart)
      {
              let result=cart.find(x => x.cart_id == cart_id);
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
  //  qtyUpdate(pid,value)
  //  {
  //       this.api.qtyUpdate(pid,value);
  //  }

   qtyUpdate(pid,value) {
     console.log(pid);
     console.log(this.uid);
    console.log("in qtyupdate function");
    console.log("value="+value);
    let cart = this.api.getCart();
    if (cart) {
      document.getElementById("openmodalbutton").click();
           let result = cart.find(x => x.cart_id == pid);
           console.log(result);
           if (result) {
                let cartId = result.cart_id;
                let c = Number(result.count);

                if(c == 1 && value == -1) {
                  this.api.deleteCart(pid);
                  this.view();
                  document.getElementById("openmodalbutton").click();
                } else {
                      c = c + value;
                      this.api.Put2(CARTUPDATE, "" , {cart_id: pid, user_id: this.uid, count: c}).then(data => {
                        
                      this.api.updateCart();
                      this.api.Cart.emit("cartUpdate" + Date.now());
                      this.view();
                      document.getElementById("mClose").click();
                    }).catch(d=>{
                      if(d.status == 401 || d.status == 503){
                        this.api.onFail('Your session is expired please login again');
                        this.api.setGoto();
                        this.api.setlogin(0);
                        this.api.logout();
                        setTimeout(() => {
                        this.router.navigate(['/login']);
                        },1000);
                      } else{console.log(d)}
                    });
                }
            }
     }
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
