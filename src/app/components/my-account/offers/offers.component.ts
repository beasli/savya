import { Router } from '@angular/router';
import { IMAGE } from 'src/config';
import { OFFER } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  data:any;
  image = IMAGE+'offer/';
  constructor(private api:ApiService,private router:Router) {
    this.api.Get(OFFER).then(data=>{
      this.data = data['data']['data'];
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
        console.log(d);
      }});
   }

  ngOnInit(): void {
  }

}
