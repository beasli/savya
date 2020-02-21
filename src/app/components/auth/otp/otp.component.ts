import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { otpverified, otpresend } from 'src/config';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
mobile_no:any;
  constructor(private route:ActivatedRoute,private api: ApiService) {
    this.mobile_no=this.route.snapshot.paramMap.get('no');
    console.log(this.mobile_no);
   }
  otpVerify(value)
  {
      console.log(value);
      this.api.Post(otpverified,{params:{
        APP_KEY:8447126401,
        mobile_no:this.mobile_no,
        otp:value.otp
      }}).then(data=>{
        console.log(data);
      });

  }
  resend()
  {
    this.api.Post(otpresend,{params:{
      APP_KEY:8447126401,
      mobile_no:this.mobile_no,
    }}).then(data=>{
      console.log(data);
    });
  }
  ngOnInit() {
  }

}
