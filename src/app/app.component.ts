import { Component } from '@angular/core';
import { ApiService } from './api/api.service';
import { CONTACT } from 'src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'savya';

 values:any;
  constructor(private api:ApiService)
  {

      this.api.Post(CONTACT,{}).then(data=>{
        //console.log(data['data'][0]);
        this.values=data['data'][0];
       // console.log(this.values);
       // console.log("values"+JSON.stringify(this.values));
      }).catch(d=>{
        console.log(d);
      })
       
this.api.getlogin.subscribe(data=>{
  //console.log("app"+data);
  if(data==1)
  {
    this.api.updateWishlist();
  }
})
  }
}
