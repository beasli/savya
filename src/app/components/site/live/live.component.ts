import { LIVEBANNER, IMAGE } from './../../../../config';
import { ApiService } from 'src/app/api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
url = IMAGE+"liveratebanner/";
exclusive:any;
banner:any;
  constructor(public api: ApiService) {
    this.api.Get(LIVEBANNER).then(data=>{
      data['body'].forEach(childObj => {
        if (childObj.category === 'LiveRate_Exclusivebanners') {
          this.banner = childObj['LiveRate_Exclusivebanners'].filter(slide => slide.place === 'Website');
        }
        else if (childObj.category === 'LiveRate_Listbanners') {
          this.exclusive = childObj['LiveRate_Listbanners'].filter(slide => slide.place === 'Website');
        }
        console.log(this.exclusive);
        console.log(this.banner);
    });
   });}


  ngOnInit(): void {
  }

}
