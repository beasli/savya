import { EVENTS } from './../../../../config';
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
  constructor(private api: ApiService) {
    this.api.Post(EVENTS, {}).then(data => {
      this.events = data['data']['data'];
      this.events['url'] = data['url'] + "/";
      this.url = this.events['url'];
    });
  }

  detail(value) {
    this.api.setEvent(value, this.url);
  }
  ngOnInit(): void {
  }

}
