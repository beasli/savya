import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PAYMENT } from 'src/config';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  values: any;
  im:boolean;
  val:boolean;
  constructor(private api:ApiService) {
    this.im=true;
    this.val=false;
    this.api.Post(PAYMENT,{}).then(data=>{
      this.im=false;
  this.val=true;
      this.values=data['data'][0].description;
     // console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
   }

  ngOnInit(): void {
  }

}
