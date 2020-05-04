import { Router } from '@angular/router';
import { VERIFY, CHECKOUT } from './../../../../config';
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
  discount:any;
  discountamount:any;
  products: any;
  callshadow:any;
  baseurl= IMAGE+"/product/";
  priceWeight:any;
  total = {'weight':0,'price':0};
  final:any;
  disamt: any;
  realFinal:any;
  feedback= '';
  constructor(private api:ApiService,private router:Router) { 
    this.uid=this.api.uid;

    this.api.Get(CARTVIEW+"?user_id="+this.uid).then(data=>{
      this.products=data['data'];
      console.log(this.products);
      this.priceWeight = this.api.calculate(this.products);
      let i = 0;
      if(this.priceWeight){
         console.log(this.priceWeight);
         this.priceWeight.forEach(element => {
         this.total.price +=element.price*this.products[i].count;
         this.total.weight +=element.weight*this.products[i].count;
       });}
        console.log(this.priceWeight);
        this.final = this.total.price + this.total.price*0.045;
        this.realFinal = this.final;
    });
    this.api.Get(GETADDRESS).then(data => {
      this.addresses = data['data'];
      this.currentAddress = this.addresses[0];
      this.clicked = this.currentAddress.id;
    });
  }
  check(value){
    this.final = this.realFinal;
    console.log(this.feedback)
    this.api.Put2(VERIFY,'',{'coupan':value.discountname}).then(data=>{
      if(data['message'] == "Wrong Coupan"){
        this.api.onFail('Not a Valid Coupan Code');
       } else {
        this.api.onSuccess('Coupen Code Successfully Applied');
        this.discountamount = data['data'];
        if  (this.discountamount.offertype == 'Percentage'){
          this.disamt = this.final * (this.discountamount.value/100);
          this.final = this.final - this.disamt;
        } else {
          this.disamt = this.discountamount.value;
          this.final = this.final - this.disamt;
        }
       }
    }).catch(data=>{
      console.log(data);
    })
  }

  getadd(id){
    this.clicked = id;
  }

  createjson(){
    if(this.total.weight >= 100 && this.currentAddress){
    let masterjson = {}
    let childjson = {};
    childjson['sgst'] = this.realFinal*0.015;
    childjson['igst'] = this.realFinal*0.015;
    childjson['cgst'] = this.realFinal*0.015;
    childjson['sgst_per'] = 1.5;
    childjson['cgst_per'] = 1.5;
    childjson['igst_per'] = 1.5;
    this.feedback ? childjson['feedback'] = this.feedback : childjson['feedback'] = '';
    childjson['transaction_id'] = '';
    childjson['paymentMode'] = 'cod';
    this.disamt ? childjson['discount_amount'] = this.disamt : childjson['discount_amount'] = '' ;
    this.discountamount ? childjson['coupanCode'] = this.discountamount.coupan : childjson['coupanCode'] = '';
    childjson['userid'] = this.api.uid;
    childjson['address_id'] = this.clicked;
    childjson['final_total'] = this.final;
    childjson['total'] = this.realFinal;
    let i = 0;
    this.products.forEach(element => {
      delete element['cart_id'];
      delete element['image'];
      delete element['price'];
      element['userid'] = element['user_id'];
      
      element['productId'] = element['product_id'];
      
      //element['productType'] = element['jwellery_type'];
      element['productType'] = 'RING';
      
      element['size'] = element['product_size'];
      
      //element['defaultColor'] = element['color'];
      element['defaultColor'] = 'Yellow';
      element['totalMakingCharge'] = '500';
      element['productTotal'] = element['count'] * this.priceWeight[i].price;
      i += 1; 
      element.assests.forEach(element2 => {
          element2['option'] = element2['options'];
          delete element2['options'];
      });
      delete element['color'];
      delete element['product_size'];
      delete element['jwellery_type'];
      delete element['product_id'];
      delete element['user_id'];
    });
    childjson['data'] = this.products;
    masterjson['calculation'] = childjson;
    
    this.api.Post(CHECKOUT,masterjson).then(data=>{
     
      this.api.onSuccess('Your Order is Successfully Placed');
      this.router.navigate(['/account-history']);
    });
        } else  {
          if(this.total.weight <= 100)  {
          this.api.onFail('Minimum Weight of order should be 100 g' + ' You need ' + (100 - this.total.weight) + 'g more');
          }
          if(!this.currentAddress)  {
            this.api.onFail('Please Add an Address First');
            }
        }
  }

  setadd(){
    this.currentAddress = this.addresses.find(x => x.id == this.clicked);
    document.getElementById("mClose").click();
  }

  addAddress(){
    this.api.setGoto();
    this.router.navigate(['/add-address']);
  }

  ngOnInit() {
  }

}
