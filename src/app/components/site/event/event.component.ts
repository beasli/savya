import { MYEVENTS, EVENTS } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
constructor(private api: ApiService, private route: ActivatedRoute, public share: ShareService, library: FaIconLibrary, private winRef: WindowRefService) {
        library.addIcons(...iconpack);
        this.uid = this.api.uid;

       // this.event = JSON.parse(this.api.getEvent());
        this.route.params.subscribe(params => {
          this.eid = params.id;
          this.api.Post(EVENTS, {}).then(data => {
            this.event = data['data']['data'];
            this.event = this.event.find(x => x.id == this.eid);
            this.event['url'] = data['url'] + "/";
          });
          });
   }
register() {
  if (!this.event.amount) {
   this.api.Post(MYEVENTS, {uid:this.uid.toString(), amount:'0' , event_type:'free', event_id:this.event.id.toString(), transaction_no:"000000"}).then(data => {
        console.log(data);
    }).catch(data=>{console.log(data)});
  }
}

shareservice() {
  console.log("share method called");

}
  ngOnInit(): void {
  }

  createRzpayOrder() {
    console.log('createRzpayOrder');
    // call api to create order_id
    var order_id = 'order_EbHNWHadq9BHcF';
    this.payWithRazor(order_id);
  }

  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_Dmzimsnc9gzT7E',
      amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Savya Jewels Business', // company name or product name
      description: '',  // product description
      image: 'assets/images/savyalogoblack.png', // company logo or product image
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
