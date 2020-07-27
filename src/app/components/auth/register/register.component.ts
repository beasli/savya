import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { REGISTER, LOGIN, PROFILEVIEW } from 'src/config';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  constructor(private api:ApiService,private router:Router) {
    this.api.getPosition().then(pos=>
      {
         console.log('Positon',pos.lat+','+pos.lng);
      });
  
   }
  sign:boolean=true;
  loading:boolean=false;
  otpcheck: boolean;
  message:any;
  alert:boolean;
  type:any;
  mobile_no:any;
  mobile:any=true;
  mob:boolean;
changeNumber(e)
{
  let t =new String(e);
  if(t.length==0||t=="null")
  {
    this.mob=false;
  }
  else if(t.length==10)
  {
    this.mob=false;
  }
  else{
    this.mob=true;
  }
}
  SignUp(value){
    
        this.loading=true;
        this.sign=false;
         if(value.name&&value.email&&value.mobile_no && !value.referal && value.address)
         {console.log(value.referal);
              this.mobile_no=value.mobile_no;
                this.api.Post(REGISTER,{name:value.name,mobile_no:value.mobile_no,email:value.email,address:value.address}).then(data=>{
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
         }else if(value.name&&value.email&&value.mobile_no&&value.referal)
         {
          this.mobile_no=value.mobile_no;
            this.api.Post(REGISTER,{name:value.name,mobile_no:value.mobile_no,email:value.email,agent_code:value.referal,address:value.address}).then(data=>{
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
        this.api.setlogin(1);
        if(this.api.goto){
          this.api.getGoto();
        } else {
         this.router.navigate(['/home']);}
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
        if(localStorage.getItem('savya_userInfo'))
        {
          this.api.updateCart();
          this.api.updateWishlist();
          this.api.updateOrderHistory();
        }
          }).catch(d=>{
            if(d.status == 503){
              this.api.onFail('Your session is expired please login again');
              this.api.setGoto();
              this.api.setlogin(0);
              this.api.logout();
              setTimeout(() => {
              this.router.navigate(['/']);
              },1000);
            } else{
              console.log(d);
            }
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
