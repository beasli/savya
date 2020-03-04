import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CONTACT } from 'src/config';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
values:any;
  constructor(private api:ApiService) { 
    this.api.Post(CONTACT,{}).then(data=>{
      this.values=data['data'][0];
      console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
  }

  ngOnInit(): void {
  }

}
