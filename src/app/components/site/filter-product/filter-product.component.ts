import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { SUBCATEGORYTYPE } from 'src/config';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {
  subid: any;
  data:any;
  
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.getsubsub();
    this.route.params.subscribe(params => {
      this.subid = params.id;
      this.getsubsub();
      console.log(params);
      });
  }
  getsubsub (){
    this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.subid } ).then(data  => {
      this.data = data['data'];
      console.log(data);});
  }
  

  ngOnInit() {
  }

}
