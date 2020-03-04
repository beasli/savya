import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { USERKYC } from 'src/config';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

  sign:boolean=true;
  loading:boolean=false;
  message:any;
  alert:boolean;
  type:any;
  mobile_no:any;
  gst:boolean;
  pan:boolean;
  aadhar:boolean;
  constructor(private api:ApiService,private router:Router) {}
  changeAadhar(e)
  {
    this.aadhar=this.AadharValidate(e);
  }
   AadharValidate(value) {
    var aadhar = value;
    var adharcardTwelveDigit = /^\d{12}$/;
    var adharSixteenDigit = /^\d{16}$/;
    if (aadhar != '') {
        if (aadhar.match(adharcardTwelveDigit)) {
            return false;
        }
        else if (aadhar.match(adharSixteenDigit)) {
            return false;
        }
        else {
            // alert("Enter valid Aadhar Number");
            return true;
        }
    }
}
  changePan(e)
{
  let t =new String(e);
  // console.log(this.fName);
  // console.log(this.lName);
  // if(t=="[A-Z]{3}([CHFATBLJGP])(?:(?<=P)" + this.fName+ "|(?<!P)" + this.lName + ")[0-9]{4}[A-Z]")
  // {
  //   this.pan=false;
  // }
  // else
  // {
  //   this.pan=true;
  // }
  
}
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
  kyc(value){
    
    this.loading=true;
    this.sign=false;
    console.log(value);
     
    this.api.Post(USERKYC,value).then(data=>{
      
              console.log(data);
              this.alert=true;
              this.message="Successful "
              this.type="success";
              this.router.navigate(['/registerOtp',this.mobile_no]);
      }).catch(d=>{
              this.type="danger";
              this.message="Sorry !  Something Went Wrong Please Recheck";
              this.loading=false;
              this.sign=true;
              this.alert=true;
              console.log(d);
      });
  
}

  ngOnInit(): void {
  }

}
