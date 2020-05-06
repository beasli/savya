import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CARTVIEW } from 'src/config';
import { RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
data:any;
value:any;
  priceWeight: any[];
  total = {'weight':0,'price':0};
  constructor(private api:ApiService,private router:Router) {
    this.api.Cart.subscribe(data => {
      this.total = {'weight': 0,'price': 0};
      this.data = this.api.getCart();
       });

  }
  canActivate(route, state: RouterStateSnapshot) {
      this.total = {'weight': 0,'price': 0};
      this.data = this.api.getCart();


    if (this.data!=null) 
    {
      this.total = {'weight':0,'price':0};
      this.priceWeight = this.api.calculate(this.data);
      if(this.priceWeight){
        let i = 0;
        this.priceWeight.forEach(element => {
        this.total.price +=element.price;
        this.total.weight +=element.weight;
        this.total.weight = this.total.weight*this.data[i].count;
        i = i+1;
      });
    }
      if(this.total.weight >= 100){
          return true;
        }else{
          this.api.onFail('Minimum order Should be of 100 gram'+' You need '+(100-this.total.weight)+' g more for Checkout');
          return true;
        }
    }
    else if(this.data==null)
    {         console.log(this.data);
              this.api.onFail("You don't have any Products for Checkout");
              
              return false;
      }
      else
      {
        this.router.navigate(['/home']);
      }
  }
}
