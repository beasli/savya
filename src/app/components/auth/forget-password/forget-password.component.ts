import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { FORGETPASSWORD } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private api: ApiService,private router: Router) { }
  mobile_no:any;
  sign:boolean=true;
 loading:boolean;
 otp:any;
  forgot(value)
  {
    this.loading=true;
    this.sign=false;
      this.mobile_no=value.mobile_no;
     // console.log(value.mobile_no);
      this.api.Post(FORGETPASSWORD,{mobile_no :value.mobile_no}).then(data=>{
        this.otp=data['otp'];
        console.log(data);
        this.router.navigate(['/forgetOtp',this.mobile_no,this.otp]);
      }).catch(d=>{
       this.loading=false;
       this.sign=true;
       console.log(d);
      });

  }


  ngOnInit() {
  }

}
