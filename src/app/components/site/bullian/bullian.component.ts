import { IMAGE, BANNER } from 'src/config';
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
  selectedState: any;
  stateid: any;
  statecities: any;
  s: any;
  callshadow: any;
  Banner: any;
  img_url: any;
  newlist: any;
  constructor(private api: ApiService, private route: Router) {
    this.api.Get(STATE).then(data => {
      this.city = data['city'];
      if (this.city) {
        this.city.forEach(element => {element.type = 'city';element.name = element.city});
      }
      this.state = data['other'];
      if (this.state) {
        this.state.forEach(element => {element.type = 'state'});
        this.newlist = this.state;
      }
      this.image = IMAGE + 'city/';
      this.img_url = IMAGE;
    });
    this.api.Post(BANNER, {user_id: 0 , type: 6 }).then(data => {this.Banner = data['data'].filter(slide => slide.place === 'Website');
      //  console.log(this.Banner);
  });
   }

   search(value) {
     console.log(value.target.value);
     if (value.target.value) {
       this.newlist = this.city.concat(this.state);
       let filter = value.target.value.toUpperCase();
       this.newlist = this.newlist.filter(item => item.name.search(new RegExp(filter, 'i')) > -1);
     } else {
      this.newlist = this.state;
     }

   }


   goMerchant(id,name='') {
    document.getElementById("mClose").click();
    this.route.navigate(['/bullion-dealers', 'bullian-dealers-'+name],{queryParams:{'city_id':id}});
  }
   selectSta(j) {
    if (j.type == 'state') {
        this.selectedState = j.name;
        this.stateid = j.id;
        this.statecities = null;
        this.api.Get(CITY + '/' + this.stateid).then(data => {
            this.statecities = data['data'];
        });
        document.getElementById("openmodalbutton").click();
    } else if (j.type == 'city') {
       this.goMerchant(j.id);
    }
   }

  ngOnInit(): void {
  }

}
