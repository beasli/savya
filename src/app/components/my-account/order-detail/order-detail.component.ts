import { IMAGE, GETADDRESS } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ORDERHISTORY } from 'src/config';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
baseurl:any=IMAGE+"/product/";
  currentId: any;
  addresses: any;
  constructor(private route:ActivatedRoute,private api: ApiService,private router: Router) { }
products:any;
orders:any;
current:any;
image = IMAGE+'product/';
  ngOnInit() {
    this.currentId=this.route.snapshot.paramMap.get('id');
    this.api.Get(ORDERHISTORY).then(data => {
          this.orders = data['data'];
          let result=this.orders.find(x => x.Order_id == this.currentId);
          this.current = result;
          this.api.Get(GETADDRESS).then(data => {
            this.addresses = data['data'].find(x => x.id == result.address_id);
          }).catch(d=>{
            if(d.status == 503){
              this.api.onFail('Your session is expired please login again');
              this.api.setGoto();
              this.api.setlogin(0);
              this.api.logout();
              setTimeout(() => {
              this.router.navigate(['/login']);
              },1000);
            } else{console.log(d)}
          });

          if (result) {
            this.products=result.product;
          }
        }).catch(d=>{
          if(d.status == 503){
            this.api.onFail('Your session is expired please login again');
            this.api.setGoto();
            this.api.setlogin(0);
            this.api.logout();
            setTimeout(() => {
            this.router.navigate(['/login']);
            },1000);
          } else{console.log(d)}
        });
  }

  changeSummary(id){
    this.products = null;
    this.router.navigate((['/order-detail', id]))
    setTimeout(() => {
      let result=this.orders.find(x => x.Order_id == id);
      this.current = result;
      this.addresses = null;
      this.api.Get(GETADDRESS).then(data => {
        this.addresses = data['data'].find(x => x.id == result.address_id);}).catch(d=>{
          if(d.status == 503){
            this.api.onFail('Your session is expired please login again');
            this.api.setGoto();
            this.api.setlogin(0);
            this.api.logout();
            setTimeout(() => {
            this.router.navigate(['/login']);
            },1000);
          } else{console.log(d)}
        });

      if (result) {
        this.products=result.product;
        this.currentId = result.orderid;
      }},200);
    
  }

}
