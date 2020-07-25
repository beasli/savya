import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { PROFILEUPDATE,IMAGE, PROFILEVIEW } from 'src/config';
const formData: FormData = new FormData();
declare var $: any;
@Component({
  selector: 'app-kyc-pending',
  templateUrl: './kyc-pending.component.html',
  styleUrls: ['./kyc-pending.component.css']
})
export class KycPendingComponent implements OnInit {
user:any;
name:any;
loader:boolean;
page:boolean=true;
photo:any;
kyc:any;
  constructor(private api:ApiService,private router:Router) {
    this.api.Post(PROFILEVIEW, {}).then(data=>{
      this.page=true;
      this.loader=false;
      console.log(data);
      this.user=data['user'];
      this.kyc=data['kyc'];
      this.photo = data['url'];
      this.name=this.user.name;
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
          this.user=data['data'];
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
  ngOnInit(): void {
   this.loader=true;
   this.page=false;
  }

}
