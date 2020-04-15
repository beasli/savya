import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { REGISTER, LOGIN } from 'src/config';
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
//scroll:boolean=false;
//   otp:any;
//   pin:boolean;
//   pass:boolean;
//   setpassword:any;
//   confirmpassword:any;
//   pan:any;
//   fName:any;
//   lName:any;
//   gst:any;
//   changeGst(e)
//   {
//     //console.log(e.length,e);
//     //this.gst=new String(e);
//     this.gst=e;
//   }
//   checkGst()
//   {

//         // console.log(this.gst);
//          if(this.gst==undefined||this.gst=="")
//          {
//            return false;
//          }
//         else if(this.gst.length>0)
//         {
//             if(this.gst=="d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}")
//             {
//               return false;
//             }
//             else if(this.gst!="d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}")
//             {
//               return true;
//             }
//         }
          
//         else
//         {
//           return false;
//         }
//   }
// changeFname(e)
// {
//   let t =new String(e);
//   this.fName=t.charAt(0);

// }
// changeLname(e)
// {
//   let t =new String(e);
//   this.lName=t.charAt(0);
// }
// changePan(e)
// {
//   // console.log(e);
//   // this.pan =new String(e);
//   this.pan=e;
// }
// checkPan()
//   {
//     //console.log(this.pan);
//     if(this.pan==undefined||this.pan=="")
//     {
//       return false;
//     }
//     else if(this.pan.length>0)
//     {
//         if(this.pan=="[A-Z]{3}([CHFATBLJGP])(?:(?<=P)" + this.fName+ "|(?<!P)" + this.lName + ")[0-9]{4}[A-Z]")
//         {
//           return false;
//         }
//         else if(this.pan!="[A-Z]{3}([CHFATBLJGP])(?:(?<=P)" + this.fName+ "|(?<!P)" + this.lName + ")[0-9]{4}[A-Z]")
//         {
//           return true;
//         }
//     }
//     else
//     {
//       return false;
//     }
//   }
// setPassword(e)
// {
//   this.setpassword=e;
// }
// changePassword(e)
// {
//   //console.log(e);
//   this.confirmpassword=e
// }
// checkPassword()
// {
//  // console.log(this.confirmpassword.length);
//   if(this.setpassword==null)
//   {
//     return false;
//   }
//   else if(this.setpassword.length>0)
//   {
//     if(this.confirmpassword.length==0)
//     {
//       return false;
//     }
//     else(this.confirmpassword.length>0)
//     {
//       if(this.confirmpassword==this.setpassword)
//       {
//         return false;
//       }
//       else{
//         return true;
//       }
//     }
//   }
// }
// changePin(e)
// {
//     let t =new String(e);
//     if(t.length==0)
//     {
//       this.pin=false;
//     }
//     else if(t.length==6)
//     {
//       this.pin=false;
//   //   console.log("perfect");
//     }
//     else{
//       this.pin=true;
//     //  console.log("imperfect");
//     }
// }
changeNumber(e)
{
  let t =new String(e);
  // console.log(t.length);
  // console.log(t);
  if(t.length==0||t=="null")
  {
    this.mob=false;
  }
  else if(t.length==10)
  {
    this.mob=false;
 //   console.log("perfect");
  }
  else{
    this.mob=true;
  //  console.log("imperfect");
  }
}
  SignUp(value){
    
        this.loading=true;
        this.sign=false;
     //   console.log(this.mobile_no);
         if(value.name&&value.email&&value.mobile_no)
         {
              this.mobile_no=value.mobile_no;
              //console.log("if condition");
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
  //console.log(this.mobile_no);
      this.api.Post(LOGIN,{mobile_no:this.mobile_no, otp:otpvalue,one_singnal:11}).then(data=>{
        this.loading=false;
        console.log(data['success'].token);
        // this.api.updateWishlist();
        // this.api.updateCart();
        // this.api.setUserInfo(this.d);
        this.api.setlogin(1);
        this.api.setMobileNo(data['success'].token);
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
  }

}
