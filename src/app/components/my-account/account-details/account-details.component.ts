import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEVIEW } from 'src/config';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
data:any;
mobile:any;
loader:boolean;
page:boolean;
  constructor(private api: ApiService) { 
    let mobile=this.api.getMobileNo();
    console.log(mobile);
    this.api.Post(PROFILEVIEW,{
      mobile:mobile
    }).then(data=>{
      this.page=true;
      this.loader=false;
      console.log(data);
      this.data=data['data'][0];
      //this.router.navigate(['/registerOtp']);
}).catch(d=>{
      console.log(d);
});

  }

  ngOnInit() {
    this.loader=true;
    this.page=false;
}
}
