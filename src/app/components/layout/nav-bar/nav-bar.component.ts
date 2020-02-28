import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  url: any;
  catall = [];
  catwithsub = [];
  catwithoutsub = [];
  constructor(private api: ApiService ) {
    this.api.Post(NAVIGATION, {}).then(data => {
      this.catall = data['data'];

      this.catall.forEach(element => {
        if (element['subcategory'].length){
          this.catwithsub.push(element);
        }
        else {
          this.catwithoutsub.push(element);
        }
        }
      );
      // console.log(this.catwithsub[0].subcategory);
      // console.log(this.catwithoutsub);
    });
   }

  ngOnInit() {
  }

}
