import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { USERKYC, PROFILEVIEW } from 'src/config';
declare var Tesseract;
declare var $: any;
const mobile: FormData = new FormData();
const pan: FormData = new FormData();
const aadhar: FormData = new FormData();
const gst: FormData = new FormData();
const visiting: FormData = new FormData();
@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  styles: [`
  .preview img{
    max-height: 500px;
  }
`]
})

export class KycComponent implements OnInit {
  pan_check:boolean;
  gst_check:boolean;
  adhar_check:boolean;
  message:any;
  alert:boolean;
  type:any;
  mobile_no:any;
  gst:any;
  pan:any;
  aadhar:any;
  userinfo:any;
  mob:any;
  loader:boolean;
  page:boolean=true;
  user:any;
  photo:any;
  name:any;
  kycValue:any;
  submit=1;
  constructor(private api:ApiService,private router:Router) {
    this.api.Post(PROFILEVIEW, {}).then(data=>{
      this.page=true;
      this.loader=false;
      console.log(data);
      this.user=data['user'];
      this.photo = data['url'];
      this.kycValue=data['kyc'];
      console.log(this.kycValue.aadhar_back);
      console.log(this.kycValue.aadhar_doc);
      console.log(this.kycValue.gst_back);
      console.log(this.kycValue.aadhar);
      console.log(this.kycValue.gst_doc);
      console.log(this.kycValue.pan_no);
      console.log(this.kycValue.gst_no);
      console.log(this.kycValue.visiting_doc);
      console.log(this.kycValue.visiting_back);
      console.log(this.kycValue.pan_doc);

      if (this.kycValue == null || this.kycValue.aadhar_back == null || this.kycValue.aadhar_doc == null 
        || this.kycValue.gst_back == null || this.kycValue.gst_doc == null 
        || this.kycValue.aadhar == null || this.kycValue.pan_no == null 
        || this.kycValue.gst_no == null || this.kycValue.visiting_doc == null
        || this.kycValue.visiting_back == null || this.kycValue.pan_doc == null ) {
            this.submit = 0;
        }
      this.name=this.user.name;
      //this.router.navigate(['/registerOtp']);
    }).catch(d=>{
      if(d.error.message == 'Unauthenticated.' && d.status == 401){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{
        console.log(d);
      }
});
  }
  fileChange(event) {
    let files:FileList=event.target.files;
    let fileList: FileList = event.target.files;
    let selectedfile=event.target.files[0];
    if(fileList.length > 0) {
      let file: File = fileList[0];
      var img = document.querySelector("#preview img");
      console.log(event.target.name);
      if(event.target.name=="gst_doc1")
      {       
              gst.append('gst_front', files.item(0), files.item(0).name);
              
              var reader = new FileReader();
              reader.onload = function(e) {
                $('#gst_front').attr('src', e.target.result);
              }
             reader.readAsDataURL(file); 
      }
      else if(event.target.name=="gst_doc2")
      {
              gst.append('gst_back', files.item(0), files.item(0).name);
              
              var reader = new FileReader();           
              reader.onload = function(e) {
                $('#gst_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc1")
      {
             aadhar.append('adhar_fornt', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc2")
      {
              aadhar.append('adhar_back', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="pan_doc")
      {
             pan.append('pan_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#pan_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc1")
      {
             visiting.append('visiting_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc2")
      {
              visiting.append('visiting_back', files.item(0), files.item(0).name);

              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
    }
  }
  modal(value)
  {
    document.getElementById(value.name).click();
  }
  changeGst(e)
  {
    
    this.gst=e;
    if(e.length==0)
    {
        this.gst_check=false;
    }
    else if(e.length==15)
    {
      var pattern = new RegExp("([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})");
      if(pattern.test(e)){
        this.gst_check=false;
        console.log(true);
      }
      else{
        this.gst_check=true;
      }
      
    }
    else{
      this.gst_check=true;
    }
  }
  changeAadhar(e)
  {
    
    this.aadhar=e;
    console.log(e.length);
    if(e.length==0)
    {
        this.adhar_check=false;
    }
    else if(e.length==14)
    {
      
      var pattern = new RegExp("\\d{4}\\s\\d{4}\\s\\d{4}");
      if(pattern.test(e)){
        this.adhar_check=false;
        console.log(true);
      }
      else{
        this.adhar_check=true;
      }
     
    }
    else{
      this.adhar_check=true;
    }
  }
  changePan(e)
  {
    this.pan=e;
    if(e.length==0)
    {
        this.pan_check=false;
    }
    else if(e.length==10)
    {
      var pattern = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
      if(pattern.test(e))
      {
        this.pan_check=false;
        console.log("true");
      }
      else{
        this.pan_check=true;
      }
     
    }
    else{
      this.pan_check=true;
    }
  }
  kyc(){
    this.loader=true;
    this.page=false;

     
     pan.append('mobile_no', this.mob);
     gst.append('mobile_no', this.mob);
     aadhar.append('mobile_no', this.mob);
     pan.append('pan_no', this.pan);
     gst.append('gst_no', this.gst);
     aadhar.append('aadhar', this.aadhar);
     visiting.append('mobile_no', this.mob);


     this.api.Post(USERKYC,gst)
     .then(data=>{
      this.page=true;
      this.loader=false;

       this.api.onSuccess("successfully done KYC");
       //this.router.navigate(['/home']);
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details and try again");
       console.log(d);
     });

     this.api.Post(USERKYC,pan)
     .then(data=>{
      this.page=true;
      this.loader=false;

       this.api.onSuccess("successfully done KYC");
      // this.router.navigate(['/home']);
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details and try again");
       console.log(d);
     });

     this.api.Post(USERKYC,aadhar)
     .then(data=>{
      this.page=true;
      this.loader=false;

       this.api.onSuccess("successfully done KYC");
      // this.router.navigate(['/home']);
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details and try again");
       console.log(d);
     });

     this.api.Post(USERKYC,visiting)
     .then(data=>{
      this.page=true;
      this.loader=false;

       this.api.onSuccess("successfully done KYC");
      // this.router.navigate(['/home']);
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details and try again");
       console.log(d);
     });

}
  ngOnInit() {
    this.loader=true;
    this.page=false;
     this.userinfo=  this.api.getUserInfo();
     this.mob=this.userinfo.mobile_no;
  }

}