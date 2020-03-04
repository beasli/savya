import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { TERMSANDCONDITION } from 'src/config';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {
values:any;
im:boolean;
val:boolean;
  constructor(private api:ApiService) { 
    this.im=true;
    this.val=false;
    this.api.Post(TERMSANDCONDITION,{}).then(data=>{
      this.im=false;
      this.val=true;
      this.values=data['data'][0].description;
     // console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
  }

  ngOnInit(): void {
  }

}
