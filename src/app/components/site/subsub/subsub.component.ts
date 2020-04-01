import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SUBCATEGORYTYPE } from 'src/config';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-subsub',
  templateUrl: './subsub.component.html',
  styleUrls: ['./subsub.component.css']
})
export class SubsubComponent implements OnInit {
subid:any;
data:any;
url:"http://admin.savyajewelsbusiness.com/admin/"
  constructor(private route:ActivatedRoute,private api:ApiService) {
    this.route.params.subscribe(params => {
      this.subid = params.id;
      this.getsubsub();
    });
   }
   getsubsub() {
    this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.subid } ).then(data  => {
      this.data = data['data'];
      console.log(data);
     }).catch(d=>{
      console.log(d);
    });
  }
  ngOnInit(): void {
  }

}
