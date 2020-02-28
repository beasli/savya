import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
data:any;
  constructor(private api: ApiService) { 
    this.data=this.api.getUserInfo();
    console.log(this.data);
   }

  ngOnInit() {
  }

}
