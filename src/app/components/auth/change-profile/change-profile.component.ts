import { IMAGE } from './../../../../config';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEUPDATE, PROFILEVIEW} from 'src/config';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
declare var $: any;
const formData: FormData = new FormData();
@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  data:any;
  d:any;
  loader:boolean;
  page:boolean;
  name:any;
  photo:any;
  
  constructor(private api:ApiService,private router:Router,private sanitizer: DomSanitizer) {
    let mobile=this.api.getMobileNo();
    console.log(mobile);
    this.api.Post(PROFILEVIEW, {
      mobile:mobile
    }).then(data=>{
      this.page=true;
      this.loader=false;
      console.log(data);
      this.data=data['user'];
      this.photo = data['url'];
      this.name=this.data.name;
      //this.router.navigate(['/registerOtp']);
    }).catch(d=>{
      if(d.status == 503){
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
changename(e)
{
  this.name=e;
  
}
changeImage(event)
{
  let files:FileList=event.target.files;
  formData.append('image', files.item(0), files.item(0).name);
  if(files.length > 0)
  {
    let file: File = files[0];
    var img = document.querySelector("#preview img");
    var reader = new FileReader();
              reader.onload = function(e) {
                $('#image_preview').attr('src', e.target.result);
                console.log(e.target.result)
              }
             reader.readAsDataURL(file); 
  }
}
  setvalues(event)
  {
    console.log(event);
  }
  modal()
  {
    document.getElementById("image").click();
  }
   update(){
    this.loader=true;
    this.page=false;
    formData.append('name',this.name);
    if(this.name.length>0){
      this.api.Post(PROFILEUPDATE, formData).then(data => {
        this.page=true;
        this.loader=false;
          console.log(data);
          this.api.setUserInfo(data['data']);
          this.data=data['data'];
          this.api.onSuccess("Profile successfully updated");
        }).catch(d=>{
          if(d.status == 503){
            this.api.onFail('Your session is expired please login again');
            this.api.setGoto();
            this.api.setlogin(0);
            this.api.logout();
            setTimeout(() => {
            this.router.navigate(['/login']);
            },1000);
          } else{
            this.page=true;
            this.loader=false;
            this.api.onFail("Please try again");
          }
        });
    }
    else if(this.name.length==0){
      this.page=true;
        this.loader=false;
      this.api.onFail("Name field can't be empty");
    }
    
}
getlink(s):SafeStyle {
  return this.sanitizer.bypassSecurityTrustStyle('url('+ IMAGE + 'app_user/' + s + ')');
}
  ngOnInit(): void {
    this.loader=true;
    this.page=false;
}

}
