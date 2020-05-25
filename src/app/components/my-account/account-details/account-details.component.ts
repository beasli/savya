import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEVIEW } from 'src/config';
import { HttpHeaders,HttpErrorResponse } from '@angular/common/http';
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
  constructor(private api: ApiService,private router: Router) { 
    
    this.api.Post(PROFILEVIEW, {}).then(data=>{
      this.page=true;
      this.loader=false;
      this.data=data['user'];
      //this.router.navigate(['/registerOtp']);
}).catch(d=>{
  if(d.status == 401 || d.status == 503){
    this.api.onFail('Your session is expired please login again');
    this.api.setGoto();
    this.api.setlogin(0);
    this.api.logout();
    setTimeout(() => {
    this.router.navigate(['/login']);
    },1000);
  } else{
    console.log(d);
  }
});

  }

  ngOnInit() {
    this.loader=true;
    this.page=false;
}
}
