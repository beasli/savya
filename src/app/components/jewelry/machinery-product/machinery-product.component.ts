import { MACHINE, IMAGE, WISHLISTADD, ASK } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  tableheader:any;
  manufacture: any;
  recents: any;
  prd_img: any;
  url = IMAGE;
  slides: any;
  index = 0;
  @ViewChild('slidez') zlides: ElementRef<HTMLElement>;
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
  table: any;
  tabledata: any;

  constructor(private api:ApiService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params =>{
      
      this.pid = params.get('detail');
      this.loader=true;
     this.page=false;
      this.api.Put(MACHINE,this.pid).then(data =>{
        this.page=true;
        this.loader=false;
        this.prd_img =data['files'];
        this.data = data['Machinerydata'];
        this.recents = data['recent_product'];
        this.manufacture = data['manufacture'];
        this.table = data['Machinerydata'][0]['description_table'];
        if(this.table){
          this.tableheader = this.table.find(x => x.rowType == 'header');
          this.tabledata = this.table.filter(x => x.rowType == 'Normal');
        }
      });
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

  ngAfterViewChecked(){
    if(!this.slides){
    setTimeout(() => {this.slides = this.zlides.nativeElement.children;},1000);
    console.log('its me');}
    
   }

 
  
  indicateSlide(a) {
    console.log("I"+a);
    this.index = a;
    this.changeSlide();
  }
   changeSlide() {
    for(let i=0;i<this.slides.length;i++){
      this.slides[i].classList.remove("active");
    }
    this.slides[this.index].classList.add("active");
  }

}
