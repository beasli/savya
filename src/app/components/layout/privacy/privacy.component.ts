import { SELLING, RETURN } from './../../../../config';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ABOUT, BUYING } from 'src/config';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  im: boolean;
  val: boolean;
  values: any;
  values2: any;
  values3: any;

  constructor(private api:ApiService) { 
    this.im=true;
    this.val=false;
    this.api.Get(RETURN).then(data=>{
      this.im=false;
     this.val=true;
      this.values3=data['data'];
      console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
  }

  ngOnInit(): void {
  }

}
