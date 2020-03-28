import { MYEVENTS, EVENTS } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { iconpack } from 'src/icons';

import { ShareService } from '@ngx-share/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
event: any;
uid: any;
eid: any;
url: any;
constructor(private api: ApiService, private route: ActivatedRoute, public share: ShareService, library: FaIconLibrary) {
        library.addIcons(...iconpack);
        this.uid = this.api.uid;

       // this.event = JSON.parse(this.api.getEvent());
        this.route.params.subscribe(params => {
          this.eid = params.id;
          this.api.Post(EVENTS, {}).then(data => {
            this.event = data['data']['data'];
            this.event = this.event.find(x => x.id == this.eid);
            this.event['url'] = data['url'] + "/";
          });
          });
   }
register() {
  if (!this.event.amount) {
   this.api.Post(MYEVENTS, {uid:this.uid.toString(), amount:'0' , event_type:'free', event_id:this.event.id.toString(), transaction_no:"000000"}).then(data => {
        console.log(data);
    }).catch(data=>{console.log(data)});
  }
}

shareservice() {
  console.log("share method called");

}
  ngOnInit(): void {
  }

}
