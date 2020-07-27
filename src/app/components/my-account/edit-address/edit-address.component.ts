import { Router, ActivatedRoute } from '@angular/router';
import { ADDADDRESS, GETADDRESS, EDITADDRESS, STATE, CITY } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
index: any;
heading: any;
addresses:[];
mob:boolean;
pin:boolean;
loading: boolean;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  this.index = this.route.snapshot.paramMap.get('id');
  if  (this.index) {
    this.heading = "  Edit Address"
    this.api.Get(GETADDRESS).then(data => {
    this.addresses = data['data'].find(x => x.id == this.index);

  

    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{console.log(d)}
    });
    }
    else  {
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
    }
    else{
      this.pin=true;
    }
}
changeNumber(e)
{
  let t =new String(e);
  if(t.length==0)
  {
    this.mob=false;
  }
  else if(t.length==10)
  {
    this.mob=false;
  }
  else{
    this.mob=true;
  }
}

   add(value) {
    if(this.index)
    {
        this.api.Put(EDITADDRESS,this.index,value).then(data => {
        this.api.onSuccess(data['message']);
        this.router.navigate(['/account-addresses']);
        }).catch(d=>{
          if(d.status == 503){
            this.api.onFail('Your session is expired please login again');
            this.api.setGoto();
            this.api.setlogin(0);
            this.api.logout();
            setTimeout(() => {
            this.router.navigate(['/']);
            },1000);
          } else{console.log(d)}
        });
    }
    else {
          this.api.Post(ADDADDRESS, value).then(data => {
            this.api.onSuccess(data['message']);
            if(!this.api.goto)
            {
            this.router.navigate(['/account-addresses']);
            } else{
              this.api.getGoto();
            }
      }).catch(d=>{
        if(d.status == 503){
          this.api.onFail('Your session is expired please login again');
          this.api.setGoto();
          this.api.setlogin(0);
          this.api.logout();
          setTimeout(() => {
          this.router.navigate(['/']);
          },1000);
        } else{console.log(d)}
      });
    }
  }
  ngOnInit(): void {
  }

}
