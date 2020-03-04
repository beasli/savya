import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ABOUT } from 'src/config';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  values:any;
  im:boolean;
  val:boolean;
  constructor(private api:ApiService) { 
    this.im=true;
    this.val=false;
    this.api.Post(ABOUT,{}).then(data=>{
      this.im=false;
     this.val=true;
      this.values=data['data'][0].description;
      console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
  }

  ngOnInit(): void {
  }

}
