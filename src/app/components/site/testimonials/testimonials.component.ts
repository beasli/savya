import { Component, OnInit, Input } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  @Input() input;
  @Input() url;
  @Input() heading;
 
  slideConfig = {
    "slidesToShow": 2, 
    "slidesToScroll": 1,  
    "dots": false, 
    "infinite": true, 
    "autoplay": true,
    "arrows": false,
  
  };
  
  constructor() { }

  ngOnInit() {
   
  }

}
