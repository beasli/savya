import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ORDERHISTORY } from 'src/config';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
baseurl:any="http://admin.savyajewelsbusiness.com/img/product/";
  constructor(private route:ActivatedRoute,private api: ApiService) { }
products:any;
orders:any;
alert:boolean;
loader:boolean;
page:boolean;
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.route.params.subscribe(params=>{
        console.log(params.id);
        this.api.Get(ORDERHISTORY).then(data => {
          this.orders = data['data'];
          let result=this.orders.find(x => x.Order_id == params.id);
          if (result) {
            this.page=true;
            this.loader=false;
            this.products=result.product;
            this.alert=false;
          } else {
            this.page=true;
            this.loader=false;
            this.alert=true;
          }
        });
      });
  }

}
