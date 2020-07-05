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
rates: [];
  timer: any;

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
      contents = JSON.parse(contents);
      this.rates = contents.rows;
    })
    .catch(() => console.log("Can’t access " + LIVERATE + " response. Blocked by browser?"))
  }

}
