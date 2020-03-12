import { Router, ActivatedRoute } from '@angular/router';
import { ADDADDRESS, GETADDRESS, EDITADDRESS } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
uid: any;
index: any;
heading: any;
addresses:[];
mob:boolean;
pin:boolean;
loading: boolean;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.uid = this.api.getUserInfo();
    this.uid = this.uid['uid'];
    this.index = this.route.snapshot.paramMap.get('id');
    if(this.index >= 0) {
      this.heading = "  Edit Address"
      this.api.Post(GETADDRESS, {uid: this.uid}).then(data => {
        this.addresses = data['data'][this.index];
      });
    }
    else{
      this.heading = "  Add New Address";
      this.addresses = [];
    }
   }

   changePin(e)
{
    let t =new String(e);
    if(t.length==0)
    {
      this.pin=false;
    }
    else if(t.length==6)
    {
      this.pin=false;
  //   console.log("perfect");
    }
    else{
      this.pin=true;
    //  console.log("imperfect");
    }
}
changeNumber(e)
{
  let t =new String(e);
 // console.log(e);
  if(t.length==0)
  {
    this.mob=false;
  }
  else if(t.length==10)
  {
    this.mob=false;
 //   console.log("perfect");
  }
  else{
    this.mob=true;
  //  console.log("imperfect");
  }
}

   add(value) {
    value['uid'] = this.uid;
    if(this.index >= 0)
    {
      value['address_id'] = this.addresses['id'];
      this.api.Post(EDITADDRESS, value).then(data => {
      if (confirm(data['message'])) {
        this.router.navigate(['/account-addresses']);
      }
    }); }
    else {
          this.api.Post(ADDADDRESS, value).then(data => {
          if (confirm(data['message'])) {
          this.router.navigate(['/account-addresses']);
        }
      });
    }
  }
  ngOnInit(): void {
  }

}
