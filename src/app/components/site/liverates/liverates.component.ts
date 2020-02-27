import { Component, OnInit, Input } from '@angular/core';
import { LIVERATE } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-liverates',
  templateUrl: './liverates.component.html',
  styleUrls: ['./liverates.component.css']
})
export class LiveratesComponent implements OnInit {
rates: [];

  constructor(private api: ApiService) {

    setInterval(() => {
      this.api.Post2(LIVERATE, {})
      .then(data2 => {
        this.rates = data2['rows'];
        console.log(this.rates);
      });
    }, 3000);
  }

  ngOnInit(): void {
  }

}
