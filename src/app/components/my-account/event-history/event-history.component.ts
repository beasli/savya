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
  loader:boolean;
  page:boolean;
  constructor(private api: ApiService,private router:Router) {

    this.uid = this.api.getUserInfo();
    this.uid = this.uid['id'];
    this.api.Get(MYEVENTS + '/' + this.uid).then(data => {
      this.page=true;
      this.loader=false;
      this.event = data['data']['data'];
    }).catch(d=>{
      this.page=true;
      this.loader=false;
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{console.log(d)}
    });
  }

  detail(value) {
    this.router.navigate(['/event', value.id]);
  }
  ngOnInit(): void {
    this.loader=true;
    this.page=false;
  }

}
