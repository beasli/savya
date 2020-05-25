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
// state:any;
// cities:any;
// statecode:any;
loading: boolean;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  this.index = this.route.snapshot.paramMap.get('id');
  if  (this.index) {
    this.heading = "  Edit Address"
    this.api.Get(GETADDRESS).then(data => {
    this.addresses = data['data'].find(x => x.id == this.index);

    // this.api.Get(STATE).then(data => {
    //   this.state = data['other'];
    //   if(this.addresses.length!=0){
    //   this.statecode = this.state.find(x => x.name == this.addresses['region']);
    // }
    //   this.api.Get(CITY+'/'+this.statecode.id).then(data => {
    //     this.cities = data['data'];
    //     });
    // });

    }).catch(d=>{
      if(d.status == 401 || d.status == 503){
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
    else  {
    //  this.statecode = {};
      //this.statecode['id'] = -1;
      this.heading = "  Add New Address";
      this.addresses = [];
      // this.api.Get(STATE).then(data => {
      //   this.state = data['other'];
      //     });
    }
   }

  //  statechange(value) {
  //    console.log(value);
  //   this.api.Get(CITY+'/'+value).then(data => {
  //     this.cities = data['data'];
  //     console.log(data);
  //     });
  //  }

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
    // value['region'] = this.state.find(x => x.id == value['region']);
    // value['region'] = value['region']['name'];
    if(this.index)
    {
        this.api.Put(EDITADDRESS,this.index,value).then(data => {
        this.api.onSuccess(data['message']);
        this.router.navigate(['/account-addresses']);
        }).catch(d=>{
          if(d.status == 401 || d.status == 503){
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
        if(d.status == 401 || d.status == 503){
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
  ngOnInit(): void {
  }

}
