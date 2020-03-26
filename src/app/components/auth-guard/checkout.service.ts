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
  constructor(private api:ApiService,private router:Router) { 
   this.data= this.api.getCart();
   console.log(this.data);
 
  }
  canActivate(route, state: RouterStateSnapshot) {
    this.api.Cart.subscribe(data=>{
      this.data= this.api.getCart();

       }) 
    
    
    if (this.data!=null) 
    {
          return true;
    }
    else if(this.data==null)
    {
          if(confirm(' sorry!your cart is empty.Go to home page'))
          {
              this.router.navigate(['/home']);
              return false;
          }
          
      }
      else
      {
        this.router.navigate(['/home']);
      }
  }
}
