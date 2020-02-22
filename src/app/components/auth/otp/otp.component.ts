import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { OTPVERIFIED,  OTPRESEND } from 'src/config';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
mobile_no:any;
  constructor(private route:ActivatedRoute,private api: ApiService,private router: Router) {
    this.mobile_no=this.route.snapshot.paramMap.get('no');
    console.log(this.mobile_no);
   }
  otpVerify(value)
  {
      console.log(value);
      this.api.Post(OTPVERIFIED,{params:{
        APP_KEY:8447126401,
        mobile_no:this.mobile_no,
        otp:value.otp
      }}).then(data=>{
        this.router.navigate(['/login']);
        console.log(data);
      });

  }
  resend()
  {
    this.api.Post(OTPRESEND,{params:{
      APP_KEY:8447126401,
      mobile_no:this.mobile_no,
    }}).then(data=>{
      console.log(data);
    });
  }
  ngOnInit() {
  }

}
