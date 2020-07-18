import { Router } from '@angular/router';
import { GETADDRESS, DELADDRESS} from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-account-addresses',
  templateUrl: './account-addresses.component.html',
  styleUrls: ['./account-addresses.component.css']
})
export class AccountAddressesComponent implements OnInit {
  addresses:any;
  loader:boolean;
  page:boolean; 
  constructor(private api: ApiService, private router: Router) {
    this.getaddress();
   }

   getaddress() {
    this.api.Get(GETADDRESS).then(data => {
      this.page=true;
      this.loader=false;
      this.addresses = data['data'];
      console.log(this.addresses);
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{console.log(d)}
    });
   }

   edit(value) {
     if (value >= 0) {
        this.router.navigate(['/edit-address', value]);
              }
    else {
      this.router.navigate(['/add-address']);
    }
   }

   delete(value) {
    
    if (confirm ("Are you sure you want to delete this address?"))  {
      this.api.delete(DELADDRESS,value).then(data => {this.addresses = data['data']; 
      this.getaddress();
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{console.log(d)}
    });
     }
   }
  ngOnInit() {
    this.loader=true;
    this.page=false;
  }

}
