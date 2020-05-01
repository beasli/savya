import { IMAGE } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { ORDERHISTORY } from 'src/config';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
baseurl:any=IMAGE+"/product/";
  currentId: any;
  constructor(private route:ActivatedRoute,private api: ApiService,private router: Router) { }
products:any;
orders:any;
image = IMAGE+'product/';
  ngOnInit() {
    this.currentId=this.route.snapshot.paramMap.get('id');
    this.api.Get(ORDERHISTORY).then(data => {
          this.orders = data['data'];
          let result=this.orders.find(x => x.Order_id == this.currentId);
          if (result) {
            this.products=result.product;
          }
        });
  }

  changeSummary(id){
    this.products = null;
    this.router.navigate((['/order-detail', id]))
    setTimeout(() => {
      let result=this.orders.find(x => x.Order_id == id);
      if (result) {
        this.products=result.product;
        this.currentId = result.orderid;
      }},200);
    
  }

}
