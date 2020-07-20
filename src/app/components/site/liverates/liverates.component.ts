import { Component, OnInit, Input } from '@angular/core';
import { LIVERATE } from 'src/config';
import { Router } from '@angular/router';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

@Component({
  selector: 'app-liverates',
  templateUrl: './liverates.component.html',
  styleUrls: ['./liverates.component.css']
})
export class LiveratesComponent implements OnInit {
rates: any;
  timer: any;
  inr:any;
  silver:any;
  gold:any;
  xagold:any;
  xasilver:any;
  preinr:any;
  presilver:any;
  pregold:any;
  prexagold:any;
  prexasilver:any;
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };

  constructor() {
    this.getRates();
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.getRates();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }


  getRates() {
    fetch(proxyurl + LIVERATE)
    .then(response => response.text())
    .then((contents: any) => {

      this.pregold = this.gold;
      this.presilver = this.silver;
      this.prexagold  = this.xagold;
      this.prexasilver  = this.xasilver;
      this.preinr = this.inr;

      contents = JSON.parse(contents);

      this.rates = contents.rows;
      this.gold = this.rates.find(x => x.Symbol == 'GLD');
      this.silver = this.rates.find(x => x.Symbol == 'SLR');
      this.xagold  = this.rates.find(x => x.Symbol == 'XAGUSD');
      this.xasilver  = this.rates.find(x => x.Symbol == 'XAUUSD');
      this.inr = this.rates.find(x => x.Symbol == 'INRSpot');
    })
    .catch(() => console.log("Can’t access " + LIVERATE + " response. Blocked by browser?"))
  }

}
