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
  addresses = [];
  uid = [];
  constructor(private api: ApiService, private router: Router) {
    this.getaddress();
   }

   getaddress() {
    this.uid = this.api.getUserInfo();
    this.uid = this.uid['uid'];
    this.api.Post(GETADDRESS, {uid: this.uid}).then(data => {this.addresses = data['data']; });
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
      this.api.Post(DELADDRESS, {address_id: value}).then(data => {this.addresses = data['data']; });
      this.getaddress();
     }
   }
  ngOnInit() {
  }

}
