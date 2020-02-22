import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { FORGETPASSWORD } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private api: ApiService,private router: Router) { }
  mobile_no:any;
  forgot(value)
  {
      this.mobile_no=value.mobile_no;
      console.log(value.mobile_no);
      this.api.Post(FORGETPASSWORD+"?APP_KEY=8447126401&mobile_no="+value.mobile_no,{}).then(data=>{
        console.log(data);
        this.router.navigate(['/forgetOtp',this.mobile_no]);
    });

  }


  ngOnInit() {
  }

}
