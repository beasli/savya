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
  constructor(private api:ApiService) {
    this.api.Get(OFFER).then(data=>{
      this.data = data['data']['data'];

    });
   }

  ngOnInit(): void {
  }

}
