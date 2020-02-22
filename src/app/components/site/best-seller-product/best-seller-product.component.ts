import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-best-seller-product',
  templateUrl: './best-seller-product.component.html',
  styleUrls: ['./best-seller-product.component.css']
})
export class BestSellerProductComponent implements OnInit {
  @Input() mostselling;
  @Input() url3;
  constructor() { }

  ngOnInit() {
  }

}
