import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { REGISTER } from 'src/config';
import { Router } from '@angular/router';
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
  message:any;
  alert:boolean;
  type:any;
  mobile_no:any;
  scroll:boolean=false;
  otp:any;
  mob:boolean;
  pin:boolean;
  pass:boolean;
  setpassword:any;
  confirmpassword:any;
  pan:any;
  fName:any;
  lName:any;
  gst:any;
  changeGst(e)
  {
    //console.log(e.length,e);
    //this.gst=new String(e);
    this.gst=e;
  }
  checkGst()
  {

        // console.log(this.gst);
         if(this.gst==undefined||this.gst=="")
         {
           return false;
         }
        else if(this.gst.length>0)
        {
            if(this.gst=="d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}")
            {
              return false;
            }
            else if(this.gst!="d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}")
            {
              return true;
            }
        }
          
        else
        {
          return false;
        }
  }
changeFname(e)
{
  let t =new String(e);
  this.fName=t.charAt(0);

}
changeLname(e)
{
  let t =new String(e);
  this.lName=t.charAt(0);
}
changePan(e)
{
  // console.log(e);
  // this.pan =new String(e);
  this.pan=e;
}
checkPan()
  {
    //console.log(this.pan);
    if(this.pan==undefined||this.pan=="")
    {
      return false;
    }
    else if(this.pan.length>0)
    {
        if(this.pan=="[A-Z]{3}([CHFATBLJGP])(?:(?<=P)" + this.fName+ "|(?<!P)" + this.lName + ")[0-9]{4}[A-Z]")
        {
          return false;
        }
        else if(this.pan!="[A-Z]{3}([CHFATBLJGP])(?:(?<=P)" + this.fName+ "|(?<!P)" + this.lName + ")[0-9]{4}[A-Z]")
        {
          return true;
        }
    }
    else
    {
      return false;
    }
  }
setPassword(e)
{
  this.setpassword=e;
}
changePassword(e)
{
  //console.log(e);
  this.confirmpassword=e
}
checkPassword()
{
 // console.log(this.confirmpassword.length);
  if(this.setpassword==null)
  {
    return false;
  }
  else if(this.setpassword.length>0)
  {
    if(this.confirmpassword.length==0)
    {
      return false;
    }
    else(this.confirmpassword.length>0)
    {
      if(this.confirmpassword==this.setpassword)
      {
        return false;
      }
      else{
        return true;
      }
    }
  }
}
changePin(e)
{
    let t =new String(e);
    if(t.length==0)
    {
      this.pin=false;
    }
    else if(t.length==6)
    {
      this.pin=false;
  //   console.log("perfect");
    }
    else{
      this.pin=true;
    //  console.log("imperfect");
    }
}
changeNumber(e)
{
  let t =new String(e);
 // console.log(e);
  if(t.length==0)
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
        this.mobile_no=value.mobile_no;
        // console.log(value);
         
        this.api.Post(REGISTER,value).then(data=>{
          
                  console.log(data);
                  console.log(data['otp']);
                  this.otp=data['otp'];
                  this.alert=true;
                  this.message="Successful Sign Up "
                  this.type="success";
                  this.router.navigate(['/registerOtp',this.mobile_no]);
                  this.api.setOtp(this.otp);
          }).catch(d=>{
                   this.scroll=true;
                  this.type="danger";
                  this.loading=false;
                  this.sign=true;
                  this.alert=true;
                  console.log(d);
               // console.log(d.error.errors.email);
                if(d.error.errors.email&&d.error.errors.mobile_no)
                {
                    this.message=d.error.errors.email + d.error.errors.mobile_no;
                }
                else if(d.error.errors.email)
                {
                  this.message=d.error.errors.email;
                }
                else if(d.error.errors.mobile_no)
                {
                  this.message= d.error.errors.mobile_no;
                }
               

          });
      
  }

  ngOnInit() {
  }

}
