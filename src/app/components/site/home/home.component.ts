import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { crausel } from 'src/config';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //slider_imgs = [];
  slider_imgs = ['../../../../assets/images/slider/800x400.png', '../../../../assets/images/slider/DSC_6018.jpg'];
  url: any;
  constructor(private api: ApiService ) {
    // this.api.Post(crausel, {}).then(data => {
    //  this.slider_imgs = data['body'][0]['app_banners'];
    //   this.url = data['url'];
    // });
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
