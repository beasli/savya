import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { USERKYC } from 'src/config';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

  sign:boolean=true;
  loading:boolean=false;
  message:any;
  alert:boolean;
  type:any;
  mobile_no:any;
  constructor(private api:ApiService,private router:Router) {}
  kyc(value){
    
    this.loading=true;
    this.sign=false;
    console.log(value);
     
    this.api.Post(USERKYC,value).then(data=>{
      
              console.log(data);
              this.alert=true;
              this.message="Successful "
              this.type="success";
              this.router.navigate(['/registerOtp',this.mobile_no]);
      }).catch(d=>{
              this.type="danger";
              this.message="Sorry !  Something Went Wrong Please Recheck";
              this.loading=false;
              this.sign=true;
              this.alert=true;
              console.log(d);
      });
  
}

  ngOnInit(): void {
  }

}
