import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { CRAUSEL } from 'src/config';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  slider_imgs = [];
  exclusive = [];
  mostselling = [];
  events = [];
  models = [{image: 'model_1.jpg'}, {image: 'model_2.jpg'}]
  partners = [{image: 'IGI_Expo.jpg'}];
  url: any;
  url2: any;
  url3: any;
  constructor(private api: ApiService ) {
      this.api.Post(CRAUSEL, {}).then(data => {

        data['body'].forEach(childObj => {
          if (childObj.category === 'app_banners') {
            this.slider_imgs = childObj['app_banners'];
          }
          else if (childObj.category === 'exclusive_banners') {
            this.exclusive = childObj['exclusive_banners'];
          }
          else if (childObj.category === 'product') {
            this.mostselling = childObj['product'];
          }
          else if (childObj.category === 'events') {
            this.events = childObj['events']
          }
       });
        this.url = data['url'];
        this.url2 = this.url + '/';
        this.url3 = data['product_url'] + '/';
      });
      let test = [{one: '1', two: '2'}, {three: '3', four: '4'}];
   }

  ngOnInit() {

  }

}
