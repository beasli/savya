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
  partners = [{image: 'IGI_Expo.jpg'}]
  
  url: any;
  url2: any;
  url3: any;
  constructor(private api: ApiService ) {
      this.api.Post(CRAUSEL, {}).then(data => {
      this.slider_imgs = data['body'][0]['app_banners'];
      this.exclusive = data['body'][3]['exclusive_banners'];
      this.url = data['url'];
      this.url2 = this.url + '/';
      this.url3 = data['product_url'] + '/';
      this.mostselling = data['body'][4]['product'];
      this.events = data['body'][5]['events'];

      });
      let test = [{one: '1', two: '2'}, {three: '3', four: '4'}];
   }

  ngOnInit() {

  }

}
