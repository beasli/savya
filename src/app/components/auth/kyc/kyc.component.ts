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
  rejcted = {'visiting':0,'adhar':0,'gst':0,'pan':0,}
  submit=1;
  why = {0:'0',1:'0',2:'0',3:'0',4:'0',5:'0',6:'0'};
  constructor(private api:ApiService,private router:Router) {

    
  
    console.log(this.kycValue);
    this.api.Post(PROFILEVIEW, {}).then(data=>{
      this.page=true;
      this.loader=false;
      console.log(data);
      this.user=data['user'];
      this.photo = data['url'];
      this.kycValue=data['kyc'];

      if(this.kycValue){

        if(this.kycValue.pan_no){
        this.pan = this.kycValue.pan_no;}
        if(this.kycValue.gst_no){
        this.gst = this.kycValue.gst_no;}
        if(this.kycValue.aadhar){
        this.aadhar = this.kycValue.aadhar;} 
      }else{
        this.kycValue={"id":null,"uid":null,"agent_code":null,"gst_no":null,"pan_no":null,"aadhar":null,"gst_doc":null,"gst_back":null,
        "aadhar_doc":null,"aadhar_back":null,"visiting_doc":null,"visiting_back":null,"pan_doc":null,"gst_doc_status":null,
        "gst_back_status":null,"aadhar_doc_status":null,"aadhar_back_status":null,"visiting_doc_status":null,
        "visiting_back_status":null,"pan_doc_status":null,"document_verified":null,
        "status":null,"created_at":null,"updated_at":null};
      }

      if (this.kycValue.aadhar_back == null || this.kycValue.aadhar_doc == null 
        || this.kycValue.gst_back == null || this.kycValue.gst_doc == null 
        || this.kycValue.aadhar == null || this.kycValue.pan_no == null 
        || this.kycValue.gst_no == null || this.kycValue.visiting_doc == null
        || this.kycValue.visiting_back == null || this.kycValue.pan_doc == null ) {
            this.submit = 0;
        }

      if(this.kycValue.aadhar_doc_status == 1 || this.kycValue.aadhar_doc_status ==  1){
          this.api.onFail('Your Aadhar Documents are Pending Please Upload them');
      }else if(this.kycValue.aadhar_doc_status == 0 || this.kycValue.aadhar_doc_status == 0){
        this.api.onFail('Your Aadhar Documents are gone for Verification');
      }else if(this.kycValue.aadhar_doc_status == 3|| this.kycValue.aadhar_doc_status == 3){
        this.api.onFail('Your Aadhar Documents are Rejected Please Reupload them');
        this.rejcted.adhar = 1;
        
      }

      if(this.kycValue.pan_doc_status == 1){
        this.api.onFail('Your Pan Documents are Pending Please Upload them');
      }else if(this.kycValue.pan_doc_status == 0){
        this.api.onFail('Your Pan Documents are gone for Verification');
      }else if(this.kycValue.pan_doc_status == 3){
        this.api.onFail('Your Pan Documents are Rejected Please Reupload them');
        this.rejcted.pan = 1;
      }

      if(this.kycValue.visiting_doc_status == 1|| this.kycValue.visiting_back_status == 1){
        this.api.onFail('Your Visiting Card is Pending Please Upload them');
      }else if(this.kycValue.visiting_doc_status == 0 || this.kycValue.visiting_back_status == 0){
        this.api.onFail('Your Visiting Card is gone for Verification');
      }else if(this.kycValue.visiting_doc_status == 3|| this.kycValue.visiting_back_status == 3){
        this.api.onFail('Your Visiting Card is Rejected Please Reupload it');
        this.rejcted.visiting = 1;
      }

      if(this.kycValue.gst_doc_status == 1|| this.kycValue.gst_back_status == 1){
        this.api.onFail('Your Gst Documents are Pending Please Upload them');
      }else if(this.kycValue.gst_doc_status == 0 || this.kycValue.gst_back_status == 0){
        this.api.onFail('Your Gst Documents are gone for Verification');
      }else if(this.kycValue.gst_doc_status == 3|| this.kycValue.gst_back_status ==  3){
        this.api.onFail('Your Gst Documents are Rejected Please Reupload them');
        this.rejcted.gst = 1;
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
        this.router.navigate(['/']);
        },1000);
      } else{
        console.log(d);
      }
});

// this.api.getPosition().then(pos=>
//   {
//      console.log(`Positon: ${pos.lng} ${pos.lat}`);
//   });
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
      {       this.why[0] ='1';
              gst.append('gst_front', files.item(0), files.item(0).name);
              
              var reader = new FileReader();
              reader.onload = function(e) {
                $('#gst_front').attr('src', e.target.result);
              }
             reader.readAsDataURL(file); 
      }
      else if(event.target.name=="gst_doc2")
      {
        this.why[1] ='1';
              gst.append('gst_back', files.item(0), files.item(0).name);
              
              var reader = new FileReader();           
              reader.onload = function(e) {
                $('#gst_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc1")
      {
        this.why[2] ='1';
             aadhar.append('adhar_fornt', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc2")
      {
        this.why[3] ='1';
              aadhar.append('adhar_back', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="pan_doc")
      {
        this.why[4] ='1';
             pan.append('pan_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#pan_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc1")
      {
        this.why[5] ='1';
             visiting.append('visiting_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc2")
      {
        this.why[6] ='1';
              visiting.append('visiting_back', files.item(0), files.item(0).name);

              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
    }

    if(gst.get('gst_back') && gst.get('gst_front') && this.gst){
      gst.append('mobile_no', this.mob);
      gst.append('gst_no', this.gst);
      this.api.Post(USERKYC,gst)
     .then(data=>{
      this.page=true;
      this.loader=false;
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details of gst and try again");
       console.log(d);
     });

    }

    if(aadhar.get('adhar_fornt') && aadhar.get('adhar_back') && this.aadhar){
      aadhar.append('mobile_no', this.mob);
      aadhar.append('aadhar', this.aadhar);
      this.api.Post(USERKYC,aadhar)
     .then(data=>{
      this.page=true;
      this.loader=false;
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details of aadhar and try again");
       console.log(d);
     });

    }

    if(pan.get('pan_front') && this.pan){
      pan.append('mobile_no', this.mob);
      pan.append('pan_no', this.pan);
      this.api.Post(USERKYC,pan)
     .then(data=>{
      this.page=true;
      this.loader=false;
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details of pan and try again");
       console.log(d);
     });

    }

    if(visiting.get('visiting_front') || visiting.get('visiting_back')){
      visiting.append('mobile_no', this.mob);
      this.api.Post(USERKYC,visiting)
     .then(data=>{
      this.page=true;
      this.loader=false;
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload remaining details of visitng and try again");
       console.log(d);
     });

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

    if((visiting.get('visiting_front') && visiting.get('visiting_back'))
     || (pan.get('pan_front') && this.pan) ||
     (aadhar.get('adhar_fornt') && aadhar.get('adhar_back') && this.aadhar) || (gst.get('gst_back') && gst.get('gst_front') && this.gst)){
       this.api.onSuccess('Your Documents are submitted Successfully')
       this.router.navigate(['/']);
     } else{
      this.loader=false;
      this.page=true;

       this.api.onFail('Please upload Documents');
     }

}
  ngOnInit() {
    this.loader=true;
    this.page=false;
     this.userinfo=  this.api.getUserInfo();
     this.mob=this.userinfo.mobile_no;
  }

}