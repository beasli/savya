import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEUPDATE, PROFILEVIEW } from 'src/config';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
  loading:boolean;
  sign:boolean=true;
  data:any;
  alert:boolean;
  message:any;
  type:any;
  d:any;
  loader:boolean;
  page:boolean;
  constructor(private api:ApiService,private router:Router) {
    let mobile=this.api.getMobileNo();
    console.log(mobile);
    this.api.Post(PROFILEVIEW, {
      mobile:mobile
    }).then(data=>{
      this.page=true;
      this.loader=false;
      console.log(data);
      this.data=data['user'];
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
   
   update(value){
    this.loader=true;
    this.page=false;
    this.alert=false
    this.loading=true;
    this.sign=false;
    // console.log(value);
    this.api.Post(PROFILEUPDATE, value).then(data => {
      this.page=true;
      this.loader=false;
              console.log(data);
              this.alert=true;
              this.message="Successful Updated "
              this.type="success";
              this.loading=false;
              this.sign=true;
              // this.d=data['data'][0];
              // console.log(this.d); 
            
            this.api.setUserInfo(data['data']);
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
          this.page=true;
          this.loader=false;
                console.log(d);
                this.type="danger";
                this.loading=false;
                this.sign=true;
                this.alert=true;
                this.message="Enter your all detail";
                console.log(d);
        }
      });
}
  ngOnInit(): void {
    this.loader=true;
    this.page=false;
}

}
