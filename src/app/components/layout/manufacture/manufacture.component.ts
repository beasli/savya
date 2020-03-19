import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  @Input() input;
  @Input() url;
  @Input() heading;
  @Input() redirect;
  @Input() slidetoshow;
  @Input() isShowAll;
  

  title: any;
  desc: any;
  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }]
  };
  constructor(private api: ApiService) {
    console.log(this.heading);
   }
   text(value) {
    if  (this.redirect == 'Y')  {
     this.title = value.title;
     this.desc = value.description;
    }
   }

   detail(value) {
     if (this.redirect == 'Y'){
    this.api.setEvent(value, this.url);
    }
  }

  ngOnInit() {
    this.slideConfig.slidesToShow = this.slidetoshow;
  }

}


