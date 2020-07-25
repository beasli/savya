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

  url: any;
  catall = [];
  catwithsub = [];
  catwithoutsub = [];
  logochange:number = 0;
  uid:any;
  results:any[];
  alert:boolean=false;
  div:boolean=false;
  baseurl:any;
  message:any="CART IS EMPTY";
  newurl:any;
  drop: any;
  machine: any;
  constructor(private api: ApiService, private router: Router) {
    
                  this.uid=this.api.uid;
                  this.api.getlogin.subscribe(data=>{
                    this.uid=this.api.uid;
                  })
            this.api.Get(NAVIGATION).then(data => {
              this.catall = data['data'];
              this.machine = '/machinery';
              this.api.machineurl = this.machine;
              this.catall.forEach(element => {
                if (element['subcategory'].length){
                  this.catwithsub.push(element);
                }
                else {
                  this.catwithoutsub.push(element);
                }
                }
              );
             
            });
            this.api.changelogo.subscribe(data=>{this.logochange = data
              if(data == 1){
                this.newurl = this.api.machineurl;
              }
            });
}
replacespace(value){
  value.replace(/ /g, "-")
}
ProductsInCart()
{
  let cart=this.api.getCart();
  if(cart)
  {
    return (cart.length);
  }
  else
  {
    return (0);
  }
}
 
 
ngOnInit() {
  this.api.getlogin.subscribe(data => {
    this.drop=data;
   })
     this.drop=this.api.drop;
}

}
