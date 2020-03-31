import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CARTVIEW, CRAUSEL } from 'src/config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-holder',
  templateUrl: './product-holder.component.html',
  styleUrls: ['./product-holder.component.css']
})
export class ProductHolderComponent implements OnInit {
  @Input() mostselling;
  @Input() url3;
  @Input() heading;
  value:boolean;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": false,
    "infinite": true,
    "autoplay": false,
    "arrows": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
    
  };

 wish:any;
 cart:any[];
drop:any;
@ViewChild('addclosebutton') addclosebutton;
@ViewChild('deleteclosebutton') deleteclosebutton;
  constructor(private api:ApiService,private router:Router) {
    this.drop=this.api.drop; 
    // console.log(this.mostselling);
    // console.log(this.url3);
    // console.log(this.heading);

    this.api.Post(CARTVIEW, {user_id: this.api.uid}).then(data => {
        this.cart = data['data'];
    }).catch(d => {
      console.log(d);
    })
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
 
 

  

  go(value) {
    this.api.godetail(value);
  }
  wishlist(pid) {
    // console.log("in wishlist");
    //console.log(pid);
   
     if(this.drop==0)
     {
        if(confirm('Please Login first'))
        {
            this.router.navigate(['/login']);
            return false;
        }
        else
        {
          this.router.navigate(['/login']);
          return false;
        }
     }
     else if(this.drop==1)
    {
      this.api.checkWishlist(pid);
    }
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
  checkCart(pid)
  {
      let check=this.api.checkCart(pid);
     // console.log(check);
      return check;
 }
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
     
  }
  addToCart(s)
  {
    this.api.addToCart(s);
  }

  ngOnInit() {
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);    
     });

  }

}
