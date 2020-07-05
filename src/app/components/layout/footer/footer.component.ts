import { Router,NavigationStart } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() values;
  logochange:number = 0;
  newurl: any;
  drop: any;
  constructor(private api:ApiService, private router:Router) { 
    this.drop=this.api.drop; 
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);
     });
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
          document.getElementById('top').click();
      }
      if (this.router.url.includes('/machinery')) 
          {  
            console.log("include");
            this.api.changelg(1);
          }else{
            this.api.changelg(0);
          }
    })

    this.api.changelogo.subscribe(data  =>  {this.logochange = data
    if(data == 1) {
      this.newurl = this.router.url;
    }
    });
  }


  ngOnInit() {
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);
     });
  }

}
