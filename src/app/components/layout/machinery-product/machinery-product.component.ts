import { MACHINE, IMAGE, WISHLISTADD, ASK } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machinery-product',
  templateUrl: './machinery-product.component.html',
  styleUrls: ['./machinery-product.component.css']
})
export class MachineryProductComponent implements OnInit {
  pid: any;
  page: boolean;
  loader: boolean;
  data: any;
  manufacture: any;
  recents: any;
  prd_img: any;
  url = IMAGE;
  slideConfig = {
    "slidesToShow": 1,
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

  constructor(private api:ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.loader=true;
     this.page=false;
      this.pid = params.id;
      this.api.Put(MACHINE,this.pid).then(data =>{
        this.page=true;
        this.loader=false;
        this.prd_img =data['files'];
        this.data = data['Machinerydata'];
        this.recents = data['recent_product'];
        this.manufacture = data['manufacture'];
        console.log(data);
      });
      this.ngOnInit();
      });
   }

   ask(){
    this.api.Post(ASK,{product_id:this.pid}).then(data=>{
      console.log(data);
         this.api.updateWishlist();
         this.api.onSuccess('Your request is send We will contact you shortly');
    }).catch(d=>{
      
     });
   }


   whislist(){
    this.api.Post(WISHLISTADD,{product_id:this.pid}).then(data=>{
      console.log(data);
         this.api.updateWishlist();
         this.api.onSuccess('Your request is send We will contact you shortly');
    }).catch(d=>{
      
     });
   }

  ngOnInit(): void {
  }

}
