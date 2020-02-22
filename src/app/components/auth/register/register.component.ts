import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { REGISTER } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private api:ApiService,private router:Router) { }
  mobile_no:any;
  SignUp(value){
    this.mobile_no=value.mobile_no;
    // console.log(value);
      this.api.Post(REGISTER,value).then(data=>{
          console.log(data);
          this.router.navigate(['/registerOtp',this.mobile_no]);
      });
  
  }

  ngOnInit() {
  }

}
