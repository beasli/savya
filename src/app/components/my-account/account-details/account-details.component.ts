import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
data:any;
  constructor() { 
    this.data=JSON.parse(localStorage.getItem('data'));
    console.log(this.data);
   }

  ngOnInit() {
  }

}
