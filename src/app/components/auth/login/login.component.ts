import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { LOGIN, OTPREQUEST, PROFILEVIEW } from 'src/config';
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
loading:boolean;
message:any;
alert:boolean;
otpcheck: boolean;
mobile:boolean=true;
mobile_no:any;
otp:any;
otpGenerate(value)
{
  this.sign=false;
  this.loading=true;
  console.log(value);
  if(value.mobile_no)
  {
    this.mobile_no=value.mobile_no;
        this.api.Post(OTPREQUEST,{mobile_no:value.mobile_no}).then(data=>{
          this.mobile=false;
          this.loading=false;
          this.otpcheck=true;
         console.log(data);
      }).catch(d=>{
        console.log(d);
        this.loading=false;
        this.message="Something Went Wrong Please Try Again";
        this.alert=true;
        this.sign=true;
      });
  }
  else if(value.password)
  {
      this.loading=true;
      this.otpcheck=false;
      this.login(value.password);
  }
}

login(otpvalue)
{
      this.api.Post(LOGIN,{mobile_no:this.mobile_no, otp:otpvalue,one_singnal:11}).then(data=>{
        this.loading=false;
        console.log(data['success'].token);
        this.api.setMobileNo(data['success'].token);
       
        // this.api.Post(PROFILEVIEW, {}).then(data=>{
        //   console.log(data);
        //   this.api.setUserInfo(data['user']);
        //    this.api.updateWishlist();
        // this.api.updateCart();
        //   }).catch(d=>{
        //         console.log(d);
        //   });
        this.api.setlogin(1);
       
        this.router.navigate(['/home']);
      }).catch(d=>{
        console.log(d);
        this.loading=false;
        this.message="INVALID OTP";
        this.alert=true;
        this.otpcheck=true;
      });
}
  ngOnInit() {
    this.api.getlogin.subscribe(data=>{
      if(this.api.drop==1)
      {
        this.api.Post(PROFILEVIEW, {}).then(data=>{
          console.log(data);
          this.api.setUserInfo(data['user']);
        //    this.api.updateWishlist();
        // this.api.updateCart();
        if(localStorage.getItem('savya_userInfo'))
        {
          this.api.updateCart();
          this.api.updateWishlist();
          this.api.updateOrderHistory();
        }
          }).catch(d=>{
                console.log(d);
          });
       
        console.log("login emitter");
      }
      if(this.api.drop==0)
      {
        console.log("logout emitter");
      }
      
    })
  }

}
