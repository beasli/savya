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
    this.router.params.subscribe(params=>{
      this.api.Get(MERCHANT+'/'+params.id).then(data=>{
        this.merchant = data['data'];
      });
    });
  }

 

  ngOnInit(): void {
  }

}
