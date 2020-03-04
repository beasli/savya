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

  constructor(private api:ApiService) {
    this.api.Post(PAYMENT,{}).then(data=>{
      this.values=data['data'][0].description;
     // console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
   }

  ngOnInit(): void {
  }

}
