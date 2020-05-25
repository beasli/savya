import { Router } from '@angular/router';
import { EVENTS, IMAGE } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
events: [];
url: any;
  constructor(private api: ApiService,private router: Router) {
    this.api.Get(EVENTS).then(data => {
      this.events = data['data']['data'];
      this.url = IMAGE+"events/";
    }).catch(d=>{
      if(d.status == 401 || d.status == 503){
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

  detail(value) {
    this.router.navigate(['/event', value.id]);
  }
  ngOnInit(): void {
  }

}
