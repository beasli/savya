import { Component, OnInit } from '@angular/core';
import { GETADDRESS, CARTVIEW, IMAGE } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addresses: any;
  currentAddress: any;
  clicked:any;
  uid: string;
  products: any;
  baseurl= IMAGE+"/product/";
  priceWeight:any;
  total = {'weight':0,'price':0};
  constructor(private api:ApiService) { 
    this.uid=this.api.uid;

    this.api.Get(CARTVIEW+"?user_id="+this.uid).then(data=>{
      this.products=data['data'];
       this.priceWeight = this.api.calculate(this.products);
       if(this.priceWeight){
       this.priceWeight.forEach(element => {
         this.total.price +=element.price;
         this.total.weight +=element.weight;
       });}
    });
    this.api.Get(GETADDRESS).then(data => {
      this.addresses = data['data'];
      this.currentAddress = this.addresses[0];
      this.clicked = this.currentAddress.id;
    });
  }

  getadd(id){
    this.clicked = id;
  }

  setadd(){
    this.currentAddress = this.addresses.find(x => x.id == this.clicked);
    document.getElementById("mClose").click();
  }

  ngOnInit() {
  }

}
