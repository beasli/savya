import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEUPDATE } from 'src/config';

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

  constructor(private api:ApiService) {
    this.data=JSON.parse(localStorage.getItem('data'));
    console.log(this.data);
   }

   
   update(value){
    
    this.loading=true;
    this.sign=false;
    // console.log(value);
     
    this.api.Post(PROFILEUPDATE,value).then(data=>{
      
              console.log(data);
              this.alert=true;
              this.message="Successful Updated "
              this.type="success";
              this.d=data['data'][0];
              console.log(this.d);
              localStorage.setItem('data',JSON.stringify(this.d));   
              //this.router.navigate(['/registerOtp']);
      }).catch(d=>{
              
              this.type="danger";
              this.loading=false;
              this.sign=true;
              this.alert=true;
              this.message="Enter your all detail";
              console.log(d);


      });
  
}


  ngOnInit(): void {
}

}
