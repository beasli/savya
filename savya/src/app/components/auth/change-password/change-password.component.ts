import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CHANGEPASSWORD } from 'src/config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  mobile_no:any;
  sign:boolean=true;
  loading:boolean;
  constructor(private api:ApiService,private route:ActivatedRoute,private router: Router) {
    this.mobile_no=this.route.snapshot.paramMap.get('no');
   }
  changePassword(value)
  {
    this.loading=true;
    this.sign=false;
    console.log(value);
    value.mobile_no = this.mobile_no;
    this.api.Post(CHANGEPASSWORD,value).then(data=>{
      console.log(data);
     this.router.navigate(['/login']);
  }).catch(d=>{
    this.loading=false;
    this.sign=true;
  });

  }
  ngOnInit() {
  }

}
