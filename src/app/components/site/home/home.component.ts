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
  url: any;
  url2: any;
  url3: any;
  constructor(private api: ApiService ) {
      this.api.Post(CRAUSEL, {}).then(data => {
      this.slider_imgs = data['body'][0]['app_banners'];
      this.exclusive = data['body'][2]['exclusive_banners'];
      this.url = data['url'];
      this.url2 = this.url + '/';
      this.url3 = data['product_url'] + '/';
      this.mostselling = data['body'][3]['product'];
      this.events = data['body'][4]['events'];
    });
   }

  ngOnInit() {
    $(".testimonial-carousel").slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      dots: true,
      prevArrow: $(".testimonial-carousel-controls .prev"),
      nextArrow: $(".testimonial-carousel-controls .next"),
      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });
  }

}
