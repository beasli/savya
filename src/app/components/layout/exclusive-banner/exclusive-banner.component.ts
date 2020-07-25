import { Component, OnInit, Input } from '@angular/core';
import { NAVIGATION } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-exclusive-banner',
  templateUrl: './exclusive-banner.component.html',
  styleUrls: ['./exclusive-banner.component.css']
})
export class ExclusiveBannerComponent implements OnInit {
  @Input() url2;
  @Input() exclusive;
  catall:any;
  constructor(private api: ApiService) {
    this.api.Get(NAVIGATION).then(data => {
      
      this.catall = data['data'];
      if(this.catall){
        this.ngOnChanges();
      }
    });
   }


  ngOnChanges() {
    if(this.exclusive && this.catall){
      this.exclusive.forEach(element => {
        element.category = this.catall.find(x => x.category_id == element.category_id);
        element.subcategory = element.category.subcategory.find(x => x.subcategory_id == element.subcategory_id);
        if(element.subcategory){
        element.subcategory = element.subcategory.subcategory.replace(/ /g, "-");
      }
      });
    }
  }



  ngOnInit(): void {
  }

}
