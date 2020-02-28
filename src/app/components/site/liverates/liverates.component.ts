import { Component, OnInit, Input } from '@angular/core';
import { LIVERATE } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

const proxyurl = "https://cors-anywhere.herokuapp.com/";

@Component({
  selector: 'app-liverates',
  templateUrl: './liverates.component.html',
  styleUrls: ['./liverates.component.css']
})
export class LiveratesComponent implements OnInit {
rates: [];

  constructor(private api: ApiService) {
   
    this.getRates();
    
  }

  ngOnInit(): void {
    setInterval(() => {
      this.getRates();
    }, 3000);
  }ß

  getRates() {
    fetch(proxyurl + LIVERATE) 
    .then(response => response.text())
    .then((contents: any) => {
      contents = JSON.parse(contents);
      this.rates = contents.rows;
    //  console.log(contents)
    })
    .catch(() => console.log("Can’t access " + LIVERATE + " response. Blocked by browser?"))
  }

}
