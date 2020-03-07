import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { CARTVIEW } from 'src/config';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
uid:any;
results:any[];
alert:boolean;
div:boolean;
baseurl:any;
message:any="CART IS EMPTY";
  constructor(private api:ApiService) {
        this.uid=this.api.uid;
        console.log("userid"+this.uid); 

        this.view();
   }
   view()
   {
        this.api.Post(CARTVIEW,{uid:this.uid}).then(data=>{
          console.log(data);
          this.baseurl=data['url']+"/";
          this.results=data['data'];
          this.alert=false;
          this.div=true;
        
        }).catch(d=>{
          this.div=false;
          this.alert=true;
          console.log(d);
        })
   }

  ngOnInit() {
  }

}
