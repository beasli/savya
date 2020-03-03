import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { REGISTER } from 'src/config';
import { Router } from '@angular/router';

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
  pan:boolean;
  fName:any;
  lName:any;
  gst:boolean;
  changeGst(e)
  {
    let t =new String(e);
    if(t=="d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}")
    {
      this.gst=false;
    }
    else
    {
      this.gst=true;
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
  let t =new String(e);
  console.log(this.fName);
  console.log(this.lName);
  if(t=="[A-Z]{3}([CHFATBLJGP])(?:(?<=P)" + this.fName+ "|(?<!P)" + this.lName + ")[0-9]{4}[A-Z]")
  {
    this.pan=false;
  }
  else
  {
    this.pan=true;
  }
}
setPassword(e)
{
  this.setpassword=e;
  if(this.confirmpassword==this.setpassword)
  {
    this.pass=false;
//   console.log("perfect");
  }
  else{
    this.pass=true;
  //  console.log("imperfect");
  }
}
changePassword(e)
{
  this.confirmpassword=e
  if(this.confirmpassword==this.setpassword)
  {
    this.pass=false;
//   console.log("perfect");
  }
  else{
    this.pass=true;
  //  console.log("imperfect");
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
