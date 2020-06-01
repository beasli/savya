import { Router, ActivatedRoute } from '@angular/router';
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
  current_page: any;
  pages: number;
  constructor(private api: ApiService,private router: Router,private route: ActivatedRoute) {
      this.route.queryParamMap.subscribe(params =>{
        this.current_page = params.get('page');
        this.current_page = Number(this.current_page);
        this.getEvent(this.current_page);
      });

  }

  getEvent(page){
    this.api.Get(EVENTS+'?page='+page).then(data => {
      this.events = data['data']['data'];
      this.url = IMAGE+"events/";
      this.pages = Math.ceil(data['data']['total']/16);
    }).catch(d=>{
      if(d.status == 503){
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
