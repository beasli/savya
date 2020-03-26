import { MYEVENTS } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
event: any;
uid: any;
constructor(private api: ApiService) {
        this.uid = this.api.uid;
        this.event = JSON.parse(this.api.getEvent());
   }
register() {
  if (!this.event.amount) {
   this.api.Post(MYEVENTS, {uid:this.uid.toString(), amount:'0' , event_type:'free', event_id:this.event.id.toString(), transaction_no:"000000"}).then(data => {
   // this.api.Post(MYEVENTS, {uid:'3', amount:'0' , event_type:'free', event_id:"4", transaction_no:"000000"}).then(data => {
        console.log(data);
    }).catch(data=>{console.log(data)});
  }
}

share() {
  console.log("share method called");

}
  ngOnInit(): void {
  }

}
