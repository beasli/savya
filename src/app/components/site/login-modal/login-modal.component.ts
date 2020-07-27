import { Component, OnInit } from '@angular/core';
import { PROFILEVIEW, LOGIN, REGISTER, OTPREQUEST } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) {
    this.mobile2=true;
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


  d:any;
  sign2:boolean=true;
  loading2:boolean;
  message2:any;
  alert2:boolean;
  otpcheck2: boolean;
  mobile2:boolean=true;
  mobile_no2:any;
  otp2:any;


  otpGenerate(value)
  {
    this.sign2=false;
    this.loading2=true;
    console.log(value);
    if(value.mobile_no2 && !value.password2)
    {
      this.mobile_no2=value.mobile_no2;
          this.api.Post(OTPREQUEST,{mobile_no:value.mobile_no2}).then(data=>{
            this.mobile2=false;
            this.loading2=false;
            this.otpcheck2=true;
           console.log(data);
        }).catch(d=>{
          console.log(d);
          this.loading2=false;
          this.message2="Something Went Wrong Please Try Again";
          this.alert2=true;
          this.sign2=true;
        });
    }
    else if(value.password2)
    {
        this.loading2=true;
        this.otpcheck2=false;
        this.login2(value.password2);
    }
  }
  
  login2(otpvalue)
  {
        this.api.Post(LOGIN,{mobile_no:this.mobile_no2, otp:otpvalue,one_singnal:11}).then(data=>{
          this.loading2=false;
          console.log(data['success'].token);
          this.api.setMobileNo(data['success'].token);
          this.api.setlogin(1);
          console.log(this.api.goto);
         if(this.api.goto){
          // this.api.getGoto();
           this.api.dismissModel();
         } else {
          this.api.dismissModel();
        //  this.router.navigate(['/home']);
      }
        }).catch(d=>{
          console.log(d);
          this.loading2=false;
          this.message2="INVALID OTP";
          this.alert2=true;
          this.otpcheck2=true;
        });
  }















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
         if(value.name&&value.email&&value.mobile_no && !value.password)
         {console.log(value.referal);
              this.mobile_no=value.mobile_no;
                this.api.Post(REGISTER,{name:value.name,mobile_no:value.mobile_no,email:value.email}).then(data=>{
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
          this.api.onSuccess("Your account is created successfully")
          this.api.dismissModel();

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
