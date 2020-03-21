import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ORDERHISTORY } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {
 orders:any;
  constructor(private api:ApiService,private router:Router) { }
  orderDetail(Order_id)
  {
    let result=this.orders.find(x => x.Order_id == Order_id);
    if(result)
    {
          this.router.navigate(['order-detail',JSON.stringify(result)]);
    }
  }
  ngOnInit() {
    this.api.Post(ORDERHISTORY,{user_id:3 }).then(data=>{
      this.orders=data['data'];
      console.log( data['data']);
     
    }).catch(d=>{
      console.log(d);
      
    })
  }

}
