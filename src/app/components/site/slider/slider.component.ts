import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() slider_imgs;
  @Input() url;
  catall: any;
  manufacturer: any;
  loop:boolean;
  constructor(private sanitizer: DomSanitizer,private api: ApiService) {
  }

ngOnChanges() {

}

  replacespace(value){
    value.replace(/ /g, "-")
  }


  ngOnInit() {
  }
}