import { IMAGE } from 'src/config';
import { MERCHANT} from './../../../../config';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bullian-merchant',
  templateUrl: './bullian-merchant.component.html',
  styleUrls: ['./bullian-merchant.component.css']
})
export class BullianMerchantComponent implements OnInit {
  merchant: any;
  image = IMAGE+'bullian_merchant/';
  callshadow:any;
  constructor(private api: ApiService,private router: ActivatedRoute) {
    this.router.queryParamMap.subscribe(params =>{
          
      
      this.api.Get(MERCHANT+'/'+params.get('city_id')).then(data=>{
        this.merchant = data['data'];
        if(this.merchant){
          this.merchant.forEach(element => {
            element.cover_image = element.cover_image.replace(/ /g, "%20");
            element.cover_image = element.cover_image.replace(/\(/g, "%28");
            element.cover_image = element.cover_image.replace(/\)/g, "%29");
            
          });
        }
      });
    });
  }

 

  ngOnInit(): void {
  }

}
