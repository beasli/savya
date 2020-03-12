import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

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

  constructor(private api:ApiService) { }
  wishlist(pid)
  {
   // console.log("in wishlist");
    //console.log(pid);
    this.api.checkWishlist(pid);
  }
  checkHeart(pid)
  {
    let isInWishlist:boolean;
    //console.log("checkheart");
    this.wish=this.api.getWishlist();
    if(this.wish)
    {
            let result=this.wish.find(x => x.product_id === pid);
        //  console.log("result="+result);
            if(result)
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
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
  }
  ngOnInit() {
  }

}
