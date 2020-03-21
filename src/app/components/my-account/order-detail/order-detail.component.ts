import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
baseurl:any="http://admin.savyajewelsbusiness.com/img/product/";
  constructor(private route:ActivatedRoute) { }
products:any;
assests:any;
  ngOnInit() {
      this.route.params.subscribe(params=>{
        // console.log(params.result);
        let data=params.result;
        let order=JSON.parse(data);
        // console.log(order);
        this.products=order.product;
        // console.log(this.products);
        // console.log(JSON.parse(order));
      })
  }

}
