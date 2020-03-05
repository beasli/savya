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
  constructor(private api:ApiService) { }
  wishlist(pid)
  {
   // console.log("in wishlist");
    //console.log(pid);
    this.api.checkWishlist(pid);
  }
  deleteWishlist(pid)
  {
      this.api.deleteWishlist(pid);
  }
  ngOnInit() {
  }

}
