import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { USERKYC } from 'src/config';
declare var Tesseract;
declare var $: any;
const formData: FormData = new FormData();
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
  constructor(private api:ApiService,private router:Router) {}
  fileChange(event) {
    let files:FileList=event.target.files;
    let fileList: FileList = event.target.files;
    let selectedfile=event.target.files[0];
    if(fileList.length > 0) {
      let file: File = fileList[0];
      var img = document.querySelector("#preview img");
      if(event.target.name=="gst_doc1")
      {
              formData.append('gst_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
              reader.onload = function(e) {
                $('#gst_front').attr('src', e.target.result);
              }
             reader.readAsDataURL(file); 
      }
      else if(event.target.name=="gst_doc2")
      {
              formData.append('gst_back', files.item(0), files.item(0).name);
              var reader = new FileReader();           
              reader.onload = function(e) {
                $('#gst_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc1")
      {
             formData.append('adhar_fornt', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc2")
      {
              formData.append('adhar_back', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="pan_doc")
      {
             formData.append('pan_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#pan_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc1")
      {
             formData.append('visiting_front', files.item(0), files.item(0).name);
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc2")
      {
              formData.append('visiting_back', files.item(0), files.item(0).name);;
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
      this.gst_check=false;
    }
    else{
      this.gst_check=true;
    }
  }
  changeAadhar(e)
  {
    
    this.aadhar=e;
    if(e.length==0)
    {
        this.adhar_check=false;
    }
    else if(e.length==12)
    {
      this.adhar_check=false;
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
      this.pan_check=false;
    }
    else{
      this.pan_check=true;
    }
  }
  kyc(){
    this.loader=true;
    this.page=false;
     formData.append('mobile_no', this.mob);
     formData.append('pan_no', this.aadhar);
     formData.append('gst_no', this.gst);
     formData.append('aadhar', this.pan);
     this.api.Post(USERKYC,formData).then(data=>{
      this.page=true;
      this.loader=false;
       console.log(data);
       this.api.onSuccess("successfully done KYC");
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.api.onFail("upload all the details and try again");
       console.log(d);
     })
}
  ngOnInit() {
     this.userinfo=  this.api. getUserInfo();
     this.mob=this.userinfo.mobile_no;
  }

}