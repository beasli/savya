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
    });
  }

  detail(value) {
    this.router.navigate(['/event', value.id]);
  }
  ngOnInit(): void {
  }

}
