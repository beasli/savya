import { MYEVENTS } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent implements OnInit {
  uid: any;
  event: [];
  url: any;
  constructor(private api: ApiService,private router: Router) {
    this.uid = this.api.getUserInfo();
    this.uid = this.uid['uid'];
    this.api.Get(MYEVENTS + this.uid).then(data => {
      this.event = data['data'];
      this.event['url'] = data['url'] + "/";
      this.url = this.event['url'];
    });
  }

  detail(value) {
    this.router.navigate(['/event', value.id]);
  }
  ngOnInit(): void {
  }

}
