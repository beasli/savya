import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CARTVIEW, CRAUSEL } from 'src/config';
import { Router } from '@angular/router';
import { $ } from 'protractor';


@Component({
  selector: 'app-product-holder',
  templateUrl: './product-holder.component.html',
  styleUrls: ['./product-holder.component.css']
})
export class ProductHolderComponent implements OnInit {
  @Input() mostselling;
  @Input() url3;
  @Input() heading;
  @Input() redirect;
  value:boolean;
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 5,
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
          dots: false
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
   } 
   ngOnChanges(){
     if(this.mostselling && this.mostselling.length){
      this.mostselling.forEach(element => {
        element.gross = 0;
        if(element.weight.Gold){element.gross += Number(element.weight.Gold)};
        if(element.weight.Silver){element.gross += Number(element.weight.Silver)};
        if(element.weight.Diamond){element.gross += Number(element.weight.Diamond)*0.2};
        if(element.weight.Stone){element.gross += Number(element.weight.Stone)*0.2};
        if(element.weight.Platinum){element.gross += Number(element.weight.Platinum)};
        console.log(element.gross);
      });
     }
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
  checkCart(pid)
  {
      let check=this.api.checkCart(pid);
     
      return check;
 }
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
  }
  

  ngOnInit() {
    this.api.getlogin.subscribe(data => {
      this.drop=data;
     });

  }

}
