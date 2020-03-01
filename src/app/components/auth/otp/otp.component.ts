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
sign:boolean=true;
loading:boolean;
otp:any;
message:any;
alert:boolean;
type:any;
  constructor(private route:ActivatedRoute,private api: ApiService,private router: Router) {
    this.mobile_no=this.route.snapshot.paramMap.get('no');
   // console.log(this.mobile_no);
    this.otp=this.route.snapshot.paramMap.get('qpzm');
    //console.log(this.otp);
   }
  otpVerify(value)
  {
    this.loading=true;
    this.sign=false;
     // console.log(value);
      if(this.otp==value.otp)
      {
        this.alert=true;
        this.type="success";
        this.message=" OTP Verified";
        this.router.navigate(['/login']);
        this.message=" otp Verified";
      }
      else {
        this.alert=true;
        this.type="danger";
        this.message=" OTP Doesn't Match . Re-Enter OTP";
        if (confirm('OTP Does not Match . Go to Register'))
        {
          this.router.navigate(['/register']);
        }
        else{
          this.router.navigate(['/home']);
        }
        this.loading=false;
         this.sign=true;
      }
      // this.api.Post(OTPVERIFIED,{params:{
      //   APP_KEY:8447126401,
      //   mobile_no:this.mobile_no,
      //   otp:value.otp
      // }}).then(data=>{
      //   this.router.navigate(['/login']);
      //   console.log(data);
      // }).catch(d=>{
      //   this.loading=false;
      //   this.sign=true;
      // });

  }
  resend()
  {
    this.api.Post(OTPRESEND,{params:{
      APP_KEY:8447126401,
      mobile_no:this.mobile_no,
    }}).then(data=>{
      console.log(data);
    }).catch(d=>{
     console.log(d);
       });

  }
  ngOnInit() {
  }

}
