import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../../api/api.service';
import { Router } from '@angular/router';
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
  constructor(private api: ApiService, private router: Router) {
    
   }
   text(value) {
    if  (this.redirect == 'Y')  {
     this.title = value.title;
     this.desc = value.description;
    }
   }

   detail(value) {
     if (this.redirect == 'Y'){
      this.router.navigate(['/event', value.id]);
    }
  }
  
  
  ngOnInit() {
    this.slideConfig.slidesToShow = this.slidetoshow;
   
  }

}
