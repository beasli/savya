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
orders:any;
alert:boolean;
  ngOnInit() {
       this.orders=JSON.parse(localStorage.getItem('orders'));
      this.route.params.subscribe(params=>{
        console.log(params.id);
        let result=this.orders.find(x => x.Order_id == params.id);
        if(result)
        {
          this.products=result.product;
          this.alert=false;
        }
        else
        {
          this.alert=true;
        }
      
      })
  }

}
