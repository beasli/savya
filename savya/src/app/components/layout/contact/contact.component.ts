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
im:boolean;
val:boolean;
  constructor(private api:ApiService) { 
  this.im=true;
  this.val=false;
    this.api.Get(CONTACT).then(data=>{
      this.im=false;
  this.val=true;
      this.values=data['data'];
      console.log(this.values);
    }).catch(d=>{
      console.log(d);
    })
  }

  ngOnInit(): void {
  }

}
