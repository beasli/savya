import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { LOGIN } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,private router:Router) { }
d:any;
sign:boolean=true;
loading:boolean=false;
message:any;
alert:boolean;
type:any;
  login(value)
  {
    this.loading=true;
    this.sign=false;
      console.log(value);
      this.api.Post(LOGIN,value).then(data=>{
          this.d=data['data'][0];
         console.log(this.d);
           this.alert=true;
            this.message="Sucessfully Logged In"
            this.type="success";
            // this.loading=true;
            // this.sign=false;
            this.api.setUserInfo(this.d);
            this.api.setlogin(1);
            this.router.navigate(['/home']);
        }).catch(d=>{
          this.type="danger";
          this.loading=false;
          this.sign=true;
          this.alert=true;
         console.log(d.error.Message);
         this.message=d.error.Message;
        });

  }

  ngOnInit() {
  }

}
