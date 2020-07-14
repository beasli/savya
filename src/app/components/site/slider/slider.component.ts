
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NAVIGATION } from 'src/config';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() slider_imgs;
  @Input() url;
  catall: any;

  constructor(private sanitizer: DomSanitizer,private api: ApiService) {
    this.api.Get(NAVIGATION).then(data => {
      
      this.catall = data['data'];
      if(this.catall){
        this.ngOnChanges();
      }
    });
   }

   ngOnChanges() {
    if(this.slider_imgs && this.catall){         
      this.slider_imgs.forEach(element => {
        element.category = this.catall.find(x => x.category_id == element.category_id);
        element.subcategory = element.category.subcategory.find(x => x.subcategory_id == element.subcategory_id);
      });       
      console.log(this.slider_imgs) ;
    }
  }


  ngOnInit() {
   

  }
}
