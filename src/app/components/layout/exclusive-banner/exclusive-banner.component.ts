import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-exclusive-banner',
  templateUrl: './exclusive-banner.component.html',
  styleUrls: ['./exclusive-banner.component.css']
})
export class ExclusiveBannerComponent implements OnInit {
  @Input() url2;
  @Input() exclusive;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.url2);
    // console.log(this.exclusive);
  }

}
