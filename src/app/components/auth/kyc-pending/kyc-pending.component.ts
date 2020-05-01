import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-kyc-pending',
  templateUrl: './kyc-pending.component.html',
  styleUrls: ['./kyc-pending.component.css']
})
export class KycPendingComponent implements OnInit {
user:any;
  constructor(private api:ApiService) {
    this.user=this.api.getUserInfo();
    console.log(this.user);
   }

  ngOnInit(): void {
  }

}
