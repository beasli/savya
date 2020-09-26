import { Router } from '@angular/router';
import { VERIFY, CHECKOUT } from './../../../../config';
import { Component, OnInit } from '@angular/core';
import { GETADDRESS, CARTVIEW, IMAGE } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
import { ShareService } from '@ngx-share/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { WindowRefService } from 'src/app/window-ref/window-ref.service';
import { iconpack } from 'src/icons';
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
  total = {'weight':0,'price':0,'making_charges':0};
  final:any;
  disamt: any;
  realFinal:any;
  feedback= '';
  paymnetmode:any;
  transaction: any;
  totalw:any;
  constructor(private api:ApiService,private router:Router,
    public share: ShareService, library: FaIconLibrary, private winRef: WindowRefService) { 
      library.addIcons(...iconpack);
      this.uid=this.api.uid;

    this.api.Get(CARTVIEW+"?user_id="+this.uid).then(data=>{
      this.products=data['data'];
      this.products = this.products.filter((v,i,a)=>a.findIndex(t=>(t.cart_id === v.cart_id))===i);
      this.priceWeight = this.api.calculate(this.products);
      let i = 0;
      if(this.priceWeight){
         console.log(this.priceWeight);
         this.priceWeight.forEach(element => {
         this.total.price +=element.price*this.products[i].count;
         console.log(this.total.price)
         this.total.weight +=element.weight*this.products[i].count;
         this.total.making_charges +=element.making*this.products[i].count;
         i++;
       });}
       this.totalw = this.total.weight.toFixed(2); 
        console.log(this.priceWeight);

        this.final = this.total.price + this.total.price*0.01;
        this.final = this.final + this.final*0.03+800;
        this.realFinal = this.final;
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
        console.log(d);
      }
});
    this.api.Get(GETADDRESS).then(data => {
      this.addresses = data['data'];
      this.currentAddress = this.addresses[0];
      this.clicked = this.currentAddress.id;
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      }
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
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
        console.log(d);
      }});
  }

  getadd(id){
    this.clicked = id;
  }

  createjson(payment='cod',transaction=''){
    let masterjson = {}
    let childjson = {};
    childjson['sgst'] = (this.realFinal*0.015).toFixed(2);
    // childjson['igst'] = (this.realFinal*0.015).toFixed(2);
    childjson['igst'] = '0';
    childjson['cgst'] = (this.realFinal*0.015).toFixed(2);
    childjson['sgst_per'] = 1.5.toFixed(1);
    childjson['cgst_per'] = 1.5.toFixed(1);
    // childjson['igst_per'] = 1.5.toFixed(1);
    childjson['igst_per'] = '0';
    this.feedback ? childjson['feedback'] = this.feedback : childjson['feedback'] = '';
    childjson['transaction_id'] = transaction;
    childjson['paymentMode'] = payment;
    this.disamt ? childjson['discount_amount'] = this.disamt.toFixed(2) : childjson['discount_amount'] = '' ;
    this.discountamount ? childjson['coupanCode'] = this.discountamount.coupan : childjson['coupanCode'] = '';
    childjson['userid'] = this.api.uid.toString();
    childjson['address_id'] = this.clicked.toString();
    childjson['final_total'] = this.final.toFixed(2);
    childjson['total'] = this.realFinal.toFixed(2);
    let i = 0;
    this.products.forEach(element => {
      delete element['cart_id'];
      delete element['image'];
      delete element['price'];
      element['userid'] = element['user_id'];
      element['productId'] = element['product_id'];
      element['productType'] = element['jwellery_type'];
      element['size'] = element['product_size'];
      element['defaultColor'] = element['selectedColor'];
      element['totalMakingCharge'] = element['count'] * this.priceWeight[i].making;
      element['productTotal'] = element['count'] * this.priceWeight[i].price;
      
      element.assests.forEach(element2 => {
          element2['option'] = element2['options'];
          element2['productId'] = element2['product_id'];
          delete element2['options'];
          delete element2['product_size'];
          delete element2['wastage'];
          delete element2['cart_id'];
          delete element2['id'];
          delete element2['selectedColor'];
          delete element2['product_id'];
      });
      delete element['selectedColor'];
      delete element['color'];
      delete element['product_size'];
      delete element['default_size'];
      delete element['jwellery_type'];
      delete element['product_id'];
      delete element['user_id'];
      i += 1; 
    });
    childjson['data'] = this.products;
    masterjson['calculation'] = childjson;
    
    this.api.Post(CHECKOUT,masterjson).then(data=>{
     
      this.api.onSuccess('Your Order is Successfully Placed');
      this.router.navigate(['/account-history']);
      this.api.Cart.emit("cartUpdate"+Date.now());
    }).catch(d=>{
      if(d.status == 503){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/']);
        },1000);
      } else{
        document.getElementById('openmodalbutton2').click();
      }
});
  }

  setadd()  {
    this.currentAddress = this.addresses.find(x => x.id == this.clicked);
    document.getElementById("mClose").click();
  }

  addAddress(){
    this.api.setGoto();
    this.router.navigate(['/account/add-address']);
  }

  register(){
    if(this.total.weight >= 100 && this.currentAddress){
     // if(this.paymnetmode=='cod'){
        this.createjson();
      // } else if(this.paymnetmode=='online'){
      //   this.payWithRazor();
      // } else{
     //   this.api.onFail('Please Choose a Proper Payment method');
   //   }
    } else  {
          if(this.total.weight <= 100)  {
          this.api.onFail('Minimum Weight of order should be 100 g' + ' You need ' + (100 - this.total.weight) + 'g more');
          }
          if(!this.currentAddress)  {
            this.api.onFail('Please Add an Address First');
            }
        }
  }

  payment(value){
    if(value=='no'){
      console.log('No payment MODE');
    } else{
      console.log(value);
      this.paymnetmode = value;
    }

  }

  // payWithRazor() {
  //   const options: any = {
  //     key: 'rzp_test_Dmzimsnc9gzT7E',
  //     amount: Math.round(Number(this.final.toFixed(2))*100), // amount should be in paise format to display Rs 1255 without decimal point
  //     currency: 'INR',
  //     name: 'Savya Jewels Business', // company name or product name
  //     description: '',  // product description
  //     image: 'http://savyajewelsbusiness.com/assets/images/savyalogoblack.png', // company logo or product image
  //   //  order_id: val, // order_id created by you in backend
  //     modal: {
  //       // We should prevent closing of the form when esc key is pressed.
  //       escape: false,
  //     },
  //     notes: {
  //       // include notes if any
  //     },
  //     theme: {
  //       color: '#c59f59'
  //     }
  //   };
  //   options.handler = ((response, error) => {
  //     options.response = response;
  //     this.transaction = response.razorpay_payment_id;
  //      this.createjson('online',response.razorpay_payment_id)
  //     console.log(response);
  //     console.log(options);
  //     // call your backend api to verify payment signature & capture transaction
  //   });
  //   options.modal.ondismiss = (() => {
  //     // handle the case when user closes the form while transaction is in progress
  //     console.log('Transaction cancelled.');
  //   });
  //   const rzp = new this.winRef.nativeWindow.Razorpay(options);
  //   rzp.open();
  // }

  ngOnInit() {
  }

}
