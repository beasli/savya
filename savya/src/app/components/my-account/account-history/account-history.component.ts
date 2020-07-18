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
 loader:boolean;
page:boolean;
alert:boolean;
  constructor(private api:ApiService,private router:Router) { }
  orderDetail(id)
  {
    this.router.navigate(['order-detail',id]);
  }
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.Get(ORDERHISTORY).then(data=>{
      this.page=true;
      this.loader=false;
      this.orders=data['data'];
     
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{
      this.alert=true;
      this.loader=false;
      this.page=false;
      }
    });
  }

  

}
