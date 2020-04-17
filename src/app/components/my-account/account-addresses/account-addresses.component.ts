import { Router } from '@angular/router';
import { GETADDRESS, DELADDRESS } from './../../../../config';
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
    });
   }

   edit(value) {
     if (value >= 0) {
        this.router.navigate(['/edit-address', value]);
              }
    else {
      this.router.navigate(['/add-address', value]);
    }
   }

   delete(value) {
    
    if (confirm ("Are you sure you want to delete this address?"))  {
      this.api.Post(DELADDRESS, {address_id: value}).then(data => {this.addresses = data['data']; 
      this.getaddress();
    });
     }
   }
  ngOnInit() {
    this.loader=true;
    this.page=false;
  }

}
