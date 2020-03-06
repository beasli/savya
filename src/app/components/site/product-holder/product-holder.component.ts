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
  };
 wish:any;

  constructor(private api:ApiService) { }
  wishlist(pid)
  {
   // console.log("in wishlist");
    //console.log(pid);
    this.api.checkWishlist(pid);
  }
  // checkHeart(pid)
  // {
  //   let isInWishlist:boolean;
  //   console.log("checkheart");
  //   this.wish=this.api.getWishlist();
  //   if(this.wish)
  //   {
  //           let result=this.wish.find(x => x.product_id === pid);
  //       //  console.log("result="+result);
  //           if(result)
  //           { 
  //             console.log("present");
            
  //           }
  //           else
  //           {
  //             console.log("not present");
              
  //           } 
  //     }
  //     else{
  //       console.log("not present");
  //     }
  // }
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
  }
  ngOnInit() {
  }

}
