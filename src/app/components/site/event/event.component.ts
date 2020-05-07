import { MYEVENTS, EVENTS, IMAGE } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { iconpack } from 'src/icons';
import { WindowRefService } from '../../../window-ref/window-ref.service';

import { ShareService } from '@ngx-share/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [WindowRefService]
})
export class EventComponent implements OnInit {
event: any;
uid: any;
eid: any;
url: any;
loader:boolean;
page:boolean;
constructor(private api: ApiService, private route: ActivatedRoute,private router:Router, public share: ShareService, library: FaIconLibrary, private winRef: WindowRefService) {
        library.addIcons(...iconpack);
        this.uid = this.api.uid;
       // this.event = JSON.parse(this.api.getEvent());
        this.route.params.subscribe(params => {
          this.eid = params.id;
          this.api.Get(EVENTS).then(data => {
            this.page=true;
            this.loader=false;
            this.event = data['data']['data'];
            this.event = this.event.find(x => x.id == this.eid);
            this.event['url'] = IMAGE+"events/";
          }).catch(d=>{
            if(d.error.message == 'Unauthenticated.' && d.status == 401){
              this.api.onFail('Your session is expired please login again');
              this.api.setGoto();
              this.api.setlogin(0);
              this.api.logout();
              setTimeout(() => {
              this.router.navigate(['/login']);
              },1000);
            } else{console.log(d)}
          });
          });
   }
register() {
  if (!this.event.amount || this.event.amount == 0) {
   this.api.Post(MYEVENTS, {uid:this.uid, amount:'0' , event_type:'free', event_id:this.event.id.toString(), transaction_no:"000000"}).then(data => {
        console.log(data);
        this.api.onSuccess('Your Registration is done for this Event');
    }).catch(d=>{
      if(d.error.message == 'Unauthenticated.' && d.status == 401){
        this.api.onFail('Your session is expired please login again');
        this.api.setGoto();
        this.api.setlogin(0);
        this.api.logout();
        setTimeout(() => {
        this.router.navigate(['/login']);
        },1000);
      } else{console.log(d)}
    });
  } else {
    this.payWithRazor(this.event.amount*100);
  }
}

shareservice() {
  console.log("share method called");

}
  ngOnInit(){
    this.loader=true;
    this.page=false;
  }

  

  payWithRazor(amt) {
    const options: any = {
      key: 'rzp_test_Dmzimsnc9gzT7E',
      amount: amt, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Savya Jewels Business', // company name or product name
      description: '',  // product description
      image: 'http://savyajewelsbusiness.com/assets/images/savyalogoblack.png', // company logo or product image
    //  order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#c59f59'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      const formData = new FormData();
      formData.append('uid', this.uid.toString());
      formData.append('amount', amt);
      formData.append('event_type', this.event.event_type);
      formData.append('event_id', this.event.id.toString());
      formData.append('transaction_no', response.razorpay_payment_id);

      this.api.Post(MYEVENTS, formData).then(data => {
        console.log(data);
      }).catch(d=>{
        if(d.error.message == 'Unauthenticated.' && d.status == 401){
          this.api.onFail('Your session is expired please login again');
          this.api.setGoto();
          this.api.setlogin(0);
          this.api.logout();
          setTimeout(() => {
          this.router.navigate(['/login']);
          },1000);
        } else{console.log(d)}
      });
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
