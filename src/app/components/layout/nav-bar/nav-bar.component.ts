import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NAVIGATION, CARTVIEW } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  uid:any;
  url: any;
  catall = [];
  catwithsub = [];
  catwithoutsub = [];
  results: any;
  baseurl: string;
  alert: boolean;
  div: boolean;
  constructor(private api: ApiService, private router: Router) {
                  //cart work start //
                  this.uid=this.api.uid;
                  console.log("userid"+this.uid); 

                  this.view();
                  //cart work end//
          
            this.api.Post(NAVIGATION, {}).then(data => {
              this.catall = data['data'];
              this.catall.forEach(element => {
                if (element['subcategory'].length){
                  this.catwithsub.push(element);
                }
                else {
                  this.catwithoutsub.push(element);
                }
                }
              );
              // console.log(this.catwithsub[0].subcategory);
              // console.log(this.catwithoutsub);
            });
}
  deleteCart(pid)
  {
    this.api.deleteCart(pid);
  }
  view()
  {
      this.api.Post(CARTVIEW,{user_id:this.uid}).then(data=>{
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

  gofilter(value) {
    console.log(value);
    this.router.navigate(['/filter', value]);
  }

ngOnInit() {
  this.api.Cart.subscribe(data => {
    this.view();
     console.log("getWishSubscribe"+data);
     });
}

}
