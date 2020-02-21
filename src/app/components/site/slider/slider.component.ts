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

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  constructor(private sanitizer: DomSanitizer) { 
    console.log(this.slider_imgs)
   }

  ngOnInit() {
    console.log(this.slider_imgs)
  }

  getlink(s): SafeStyle {
    let z = this.url + '/' + s;
    console.log(s);
    return this.sanitizer.bypassSecurityTrustStyle('url(' + z + ')');
  }
}
