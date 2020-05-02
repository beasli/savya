import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { USERKYC } from 'src/config';
declare var Tesseract;
declare var $: any;
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
  ///new
  gst_front:any;
  gst_back:any;
  adhar_front:any;
  adhar_back:any;
  pan_doc:any;
 visiting_front:any;
 visiting_back:any;
 mob:any;
  constructor(private api:ApiService,private router:Router) {}
  fileChange(event) {
    console.log(event.target.files[0]);
    let fileList: FileList = event.target.files;
    let selectedfile=event.target.files[0];
    console.log(selectedfile);
    if(fileList.length > 0) {
      let file: File = fileList[0];
      var img = document.querySelector("#preview img");
      // img.file = file;
      console.log(img);
      if(event.target.name=="gst_doc1")
      {
              this.gst_front=selectedfile;
              var reader = new FileReader();
              reader.onload = function(e) {
                $('#gst_front').attr('src', e.target.result);
              //   var g=e.target.result;
              //  console.log(g);
              }
              // reader.onload = (event) => { 
              //   this.gst_front = reader.result
              // }
             
           reader.readAsDataURL(file); 
      }
      else if(event.target.name=="gst_doc2")
      {
              this.gst_back=event.target.value;
              var reader = new FileReader();           
              reader.onload = function(e) {
                $('#gst_back').attr('src', e.target.result);
              }
              // reader.onload = (event) => { 
              //   this.gst_back = reader.result;
              // }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc1")
      {
              this.adhar_front=event.target.value;
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="aadhar_doc2")
      {
              this.adhar_back=event.target.value;
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#adhar_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="pan_doc")
      {
              this.pan_doc=event.target.value;
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#pan_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc1")
      {
              this.visiting_front=event.target.value;
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_front').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }
      else if(event.target.name=="visiting_doc2")
      {
              this.visiting_back=event.target.value;
              var reader = new FileReader();
               reader.onload = function(e) {
                $('#visiting_back').attr('src', e.target.result);
              }
            reader.readAsDataURL(file);
      }


    }
  }
    // test(value){
      
    //   console.log("in test function");
    //   console.log(value);
    //   Tesseract.recognize(value).then(function(result){   
    //     console.log(result);     
    //     // alert(result.text);      
    //     });    
    // }
  modal(value)
  {
    console.log(value); 
    document.getElementById(value.name).click();
  }
  changeGst(e)
  {
    this.gst=e;
    console.log(this.gst);
  }
  changeAadhar(e)
  {
    this.aadhar=e;
    console.log(this.aadhar);
  }
  changePan(e)
  {
    this.pan=e;
    console.log(this.pan); 
  }

  kyc(){
    console.log(this.gst_front);
    this.loading=true;
    this.sign=false;
    this.api.Post(USERKYC,{
                        gst_no:this.gst,
                        pan_no:this.pan,
                        aadhar:this.aadhar,
                        mobile_no:this.mob,
                        gst_front:this.gst_front,
                        adhar_fornt:this.adhar_front,
                        pan_doc:this.pan_doc,
                        gst_back:this.gst_back,
                        adhar_back:this.adhar_back,
                        visiting_doc:this.visiting_front}).then(data=>{
              console.log(data);
              this.alert=true;
              this.message="Successful "
              this.type="success";
      }).catch(d=>{
              this.type="danger";
              this.message="Sorry !  Something Went Wrong Please Recheck";
              this.loading=false;
              this.sign=true;
              this.alert=true;
              console.log(d);
      });
  
}



//   checkAdhar()
//   {
//     if(this.aadhar==null)
//     {
//       return false;
//     }
//     else if(this.aadhar>0)
//     {
//         var response=this.AadharValidate()
//         if(response==false)
//         {
//           return false;
//         }
//         else if(response==true){
//           return true;
//         }
//     }
//   }
//    AadharValidate() {
//     var adharcardTwelveDigit = /^\d{12}$/;
//     var adharSixteenDigit = /^\d{16}$/;
//     if (this.aadhar.match(adharcardTwelveDigit)) {
//       return false;
//     }
//     else if (this.aadhar.match(adharSixteenDigit)) {
//         return false;
//     }
//     else {
//         return true;
//     }
    
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


  ngOnInit() {
     this.userinfo=  this.api. getUserInfo();
     this.mob=this.userinfo.mobile_no;
     //console.log(this.userinfo.mobile_no);
    // this.fName=this.userinfo.name.charAt(0);
    // console.log(this.fName);
    // this.lName=this.userinfo.lastname.charAt0(0);
  }

}