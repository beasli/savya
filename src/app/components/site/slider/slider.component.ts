import { Component, OnInit, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() slider_imgs;
  @Input() url;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  //  console.log(this.slider_imgs);
  }
}
