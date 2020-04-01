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
  gst:any;
  pan:any;
  aadhar:any;
  userinfo:any;
  fName:any;
  lName:any;
  constructor(private api:ApiService,private router:Router) {}
  changeAadhar(e)
  {
   // console.log(e.length);
    this.aadhar=e;
  }
  checkAdhar()
  {
    if(this.aadhar==null)
    {
      return false;
    }
    else if(this.aadhar>0)
    {
        var response=this.AadharValidate()
        if(response==false)
        {
          return false;
        }
        else if(response==true){
          return true;
        }
    }
  }
   AadharValidate() {
    var adharcardTwelveDigit = /^\d{12}$/;
    var adharSixteenDigit = /^\d{16}$/;
    if (this.aadhar.match(adharcardTwelveDigit)) {
      return false;
    }
    else if (this.aadhar.match(adharSixteenDigit)) {
        return false;
    }
    else {
        return true;
    }
    
}
  changePan(e)
{
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

  changeGst(e)
  {
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
  kyc(value){
    
    this.loading=true;
    this.sign=false;
    console.log(value);
    var Ngocr = require("Ngocr");
    Ngocr.decodeFile(value.gst_doc, function(error, data){
      console.log("decodefile function");
      console.log(data); 
    });
    // this.api.Post(USERKYC,value).then(data=>{
      
    //           console.log(data);
    //           this.alert=true;
    //           this.message="Successful "
    //           this.type="success";
    //           this.router.navigate(['/registerOtp',this.mobile_no]);
    //   }).catch(d=>{
    //           this.type="danger";
    //           this.message="Sorry !  Something Went Wrong Please Recheck";
    //           this.loading=false;
    //           this.sign=true;
    //           this.alert=true;
    //           console.log(d);
    //   });
  
}

  ngOnInit() {
    this.userinfo=  this.api. getUserInfo()
    console.log(this.userinfo);
    this.fName=this.userinfo.name.charAt(0);
    console.log(this.fName);
    this.lName=this.userinfo.lastname.charAt0(0);
  }

}
