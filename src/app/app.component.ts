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

      this.api.Get(CONTACT).then(data=>{
        this.values=data['data'];
      }).catch(d=>{
      })
       
this.api.getlogin.subscribe(data=>{
  
  if(data==1)
  {
    this.api.updateWishlist();
    this.api.updateCart();
  }
})
  }
  changeOfRoutes(){
    this.api.updateCart();
  }
}
