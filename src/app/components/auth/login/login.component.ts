import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { LOGIN } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private api: ApiService,private router:Router) { 
    this.mobile=true;
  }
d:any;
sign:boolean=true;
loading:boolean=false;
message:any;
alert:boolean;
otpcheck: boolean;
password:boolean;  
mobile:boolean;
otp:any;
login(value)
  {
    this.loading=true;
    this.sign=false;
    //console.log(value);
    if(value.mobile_no)
    {
            this.api.Post(LOGIN,{mobile_no:value.mobile_no,imei:"web",mobile_type:"web",one_singnal:"web"}).then(data=>{
              //console.log(data);
              this.alert=false;
              this.password=true;
              this.loading=false;
              this.sign=false;
              this.otpcheck=true;
              this.mobile=false;
              this.otp=data['otp'];
              this.d=data['data'][0];
            }).catch(d=>{
              this.message="Something Went Wrong Please Try Again";
              this.alert=true;
              this.loading=false;
              this.sign=true;
              this.password=false;
              this.otpcheck=false;
              this.mobile=true;
                // console.log(d);
                  });
        }
        else if(value.password)
        {
            this.loading=false;
            this.verifyOtp(value.password);
        }
  }
  verifyOtp(value)
  {
    if(value==this.otp)
    {
      //console.log("logged in");
      this.alert=false;
      this.api.updateWishlist();
      this.api.updateCart();
      this.api.setUserInfo(this.d);
      this.api.setlogin(1);
      this.router.navigate(['/home']);

    }
    else{
      //console.log("not logged in");
      this.message="INVALID OTP";
      this.alert=true;
    }
  }
  ngOnInit() {
  }

}
