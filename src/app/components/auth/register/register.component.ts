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

  constructor(private api:ApiService,private router:Router) { }
  sign:boolean=true;
  loading:boolean=false;
  message:any;
  alert:boolean;
  type:any;
  mobile_no:any;
  scroll:boolean=false;
  otp:any;
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
                  this.router.navigate(['/registerOtp',this.mobile_no,this.otp]);
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
