import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { SELLING } from 'src/config';

@Component({
  selector: 'app-sellterms',
  templateUrl: './sellterms.component.html',
  styleUrls: ['./sellterms.component.css']
})
export class SelltermsComponent implements OnInit {
  im: boolean;
  val: boolean;
  values2: any;
  values(values: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private api:ApiService) { 
    this.api.Get(SELLING).then(data=>{
      this.im=false;
     this.val=true;
      this.values2=data['data'];
      console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
  }

  ngOnInit(): void {
  }

}
