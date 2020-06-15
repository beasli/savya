import { IMAGE } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { CRAUSEL } from 'src/config';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  slider_imgs: any;
  exclusive: any;
  mostselling: any;
  events: any;
  models = [{image: 'model_1.jpg'}, {image: 'model_2.jpg'}]
  partners = [{image: 'IGI_Expo.jpg'}];
  company_slider =[{image: "IGI_Expo.jpg"}, {image: "download.png"}, {image: "bvclogo.png"}, {image: "bvclogo.png"}];
  logo =[{image: "1583387862_000.jpg", title:"NK Chains Pvt. Ltd."}, {image: "1583410753_BT.png", title:"Bhatia & Company"}, {image: "1584361390_Chainganganew.jpg", title:"Chain Ganga"}, {image: "1584361460_Somya-Jeweller.jpg", title:"Somya Jeweller"}, {image: "1584363984_logo.jpg", title:"Raj & Sons Jewellers"}, {image: "1584516771_PT-Logo-1.jpg", title:"PURE PLATINUM JEWELLERY"}, {image: "1584623038_logo.png", title:"Jai Maa Brijeshwari Jewellers"}];
  url: any;
  manufacturerurl:any;
  manufacturer: any;
  loader:boolean;
  page:boolean;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  event: any;
  product: string;
  manufacture: string;
  
  constructor(private api: ApiService ) {
      this.api.Get(CRAUSEL).then(data => {
        this.page=true;
      this.loader=false;
        console.log(data);
        data['body'].forEach(childObj => {
          if (childObj.category === 'app_banners') {
            this.slider_imgs = childObj['app_banners'].filter(slide => slide.place === 'Website');
          }
          else if (childObj.category === 'exclusive_banners') {
            this.exclusive = childObj['exclusive_banners'].filter(slide => slide.place === 'Website');
          }
          else if (childObj.category === 'product') {
            this.mostselling = childObj['product'];
          }
          else if (childObj.category === 'events') {
            this.events = childObj['events']
          }
          else if (childObj.category === 'manufacture') {
            this.manufacturer = childObj['manufacture'];
          }
       });
       this.exclusive.forEach(element => {
        element.image = element.image.replace(/ /g, "%20");
        element.image = element.image.replace(/\(/g, "%28");
        element.image = element.image.replace(/\)/g, "%29");
        console.log(element.image);
      });
        this.url = IMAGE+"banner/";
        this.event = IMAGE+"events/";
        this.product = IMAGE+"product/";
        this.manufacture = IMAGE+"users/";
        console.log(this.manufacture);
      }).catch(d=>{
        console.log(d);
        document.getElementById("openModalButton").click();
      });
   }

  ngOnInit() {
    this.loader=true;
    this.page=false;
  }

}
