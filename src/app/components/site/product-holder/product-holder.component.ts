import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
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
  };
 wish: any;

  constructor(private api: ApiService, private router: Router) { }

  go(value,img) {
    sessionStorage.setItem('prd_image', img);
    this.api.godetail(value);
  }
  wishlist(pid) {
   // console.log("in wishlist");
    //console.log(pid);
    this.api.checkWishlist(pid);
  }
  checkHeart(pid) {
    let isInWishlist:boolean;
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
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
  }
  ngOnInit() {
  }

}
