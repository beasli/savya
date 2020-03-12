import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
event: any;
constructor(private api: ApiService) {
        this.event = JSON.parse(this.api.getEvent());
        console.log(this.event);
   }
register() {
  console.log("register method called");
}

share() {
  console.log("share method called");
}
  ngOnInit(): void {
  }

}
