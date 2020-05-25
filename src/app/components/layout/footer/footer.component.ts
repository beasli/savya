import { Router } from '@angular/router';
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
  constructor(private api:ApiService, private router:Router) { 
    this.api.changelogo.subscribe(data=>{this.logochange = data
    console.log(this.logochange);
    if(data == 1){
      this.newurl = this.router.url;
    }
    });
  }


  ngOnInit() {
    
  }

}
