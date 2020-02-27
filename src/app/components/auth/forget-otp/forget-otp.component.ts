import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { OTPVERIFIED, OTPRESEND } from 'src/config';

@Component({
  selector: 'app-forget-otp',
  templateUrl: './forget-otp.component.html',
  styleUrls: ['./forget-otp.component.css']
})
export class ForgetOtpComponent implements OnInit {

  mobile_no:any;
  sign:boolean=true;
  loading:boolean;
  constructor(private route:ActivatedRoute,private api: ApiService,private router: Router) {
    this.mobile_no=this.route.snapshot.paramMap.get('no');
    console.log(this.mobile_no);
   }
  otpVerify(value)
  {
    this.loading=true;
    this.sign=false;
      console.log(value);
      this.api.Post(OTPVERIFIED,{params:{
        APP_KEY:8447126401,
        mobile_no:this.mobile_no,
        otp:value.otp
      }}).then(data=>{
        this.router.navigate(['/change',this.mobile_no]);
        console.log(data);
      }).catch(d=>{
        this.loading=false;
        this.sign=true;
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
