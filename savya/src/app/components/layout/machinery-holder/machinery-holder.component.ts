import { IMAGE } from './../../../../config';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-machinery-holder',
  templateUrl: './machinery-holder.component.html',
  styleUrls: ['./machinery-holder.component.css']
})
export class MachineryHolderComponent implements OnInit {
  @Input() mostselling;
  url3 = IMAGE+'product/';
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": false,
    "infinite": true,
    "autoplay": false,
    "arrows": true,
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
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
    
  };
  @Input() heading;
  constructor(private router:Router) { 
    console.log("hellooo");
  }
  go(argument){
    this.router.navigate(['/products/machinery', argument]);
  }
  ngOnInit(): void {
    console.log("hellooo");
    console.log(this.mostselling);
  }

}
