import { IMAGE } from 'src/config';
import { STATE, CITY } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bullian',
  templateUrl: './bullian.component.html',
  styleUrls: ['./bullian.component.css']
})
export class BullianComponent implements OnInit {
  state: any;
  city: any;
  image: any;
  selectedState:any;
  stateid: any;
  statecities:any;
  constructor(private api: ApiService,private route: Router) {
    this.api.Get(STATE).then(data => {
      this.city = data['city'];
      this.state = data['other'];
      this.image = IMAGE+'city/';
    });
   }

   goMerchant(id){
    document.getElementById("mClose").click();
    this.route.navigate(['/bullion', id]);
  }
   selectSta(id,name){
     this.selectedState = name;
     this.stateid = id;
     this.statecities=null;
     this.api.Get(CITY+'/'+this.stateid).then(data => {
        this.statecities = data['data']; 
    });
     document.getElementById("openmodalbutton").click();
   }

  ngOnInit(): void {
  }

}
