import { IMAGE } from './../../../../config';
import { ApiService } from './../../../api/api.service';
import { Component, OnInit } from '@angular/core';
import { CRAUSEL } from 'src/config';
import { DomSanitizer } from '@angular/platform-browser';

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
  videos:any;
  partner:any;
  company_slider =[{image: "IGI_Expo.jpg"}, {image: "download.png"}, {image: "bvclogo.png"}, {image: "bvclogo.png"}];
  logo =[{image: "1583387862_000.jpg", title:"NK Chains Pvt. Ltd."}, {image: "1583410753_BT.png", title:"Bhatia & Company"}, {image: "1584361390_Chainganganew.jpg", title:"Chain Ganga"}, {image: "1584361460_Somya-Jeweller.jpg", title:"Somya Jeweller"}, {image: "1584363984_logo.jpg", title:"Raj & Sons Jewellers"}, {image: "1584516771_PT-Logo-1.jpg", title:"PURE PLATINUM JEWELLERY"}, {image: "1584623038_logo.png", title:"Jai Maa Brijeshwari Jewellers"}];
  url: any;
  manufacturerurl:any;
  manufacturer: any;
  base = IMAGE;
  gallery:any;
  loader:boolean;
  page:boolean;
  slideConfig2 = {
    "slidesToShow": 2,
    "slidesToScroll": 2,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };


  slideConfig = {
    "slidesToShow": 5,
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
          dots: false
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
  
  constructor(private api: ApiService, private DOM: DomSanitizer) {
      this.api.Get(CRAUSEL).then(data => {
        this.page=true;
      this.loader=false;
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
          }else if (childObj.category === 'gallery') {
            this.gallery = childObj['gallery'];
            this.gallery.forEach(element => {element.image = element.file_name});
          }else if (childObj.category === 'video') {
            this.videos = childObj['video'];
            console.log(this.videos)
          }else if (childObj.category === 'partner') {
            this.partner = childObj['partner'];
            console.log(this.videos)
          }
       });
       this.exclusive.forEach(element => {
        element.image = element.image.replace(/ /g, "%20");
        element.image = element.image.replace(/\(/g, "%28");
        element.image = element.image.replace(/\)/g, "%29");
        console.log(element.image);
      });
      this.videos.forEach(element => {
        element.file_name = element.file_name.replace(/ /g, "%20");
        element.file_name = element.file_name.replace(/\(/g, "%28");
        element.file_name = element.file_name.replace(/\)/g, "%29");
        console.log(element.image);
      });
        this.url = IMAGE+"banner/";
        this.event = IMAGE+"events/";
        this.product = IMAGE+"product/";
        this.manufacture = IMAGE+"users/";
      }).catch(d=>{
        document.getElementById("openModalButton").click();
      });
   }
   bypass(url){
    return this.DOM.bypassSecurityTrustResourceUrl(url);
  }
  bypass2(url){
    return this.DOM.bypassSecurityTrustResourceUrl(IMAGE+"gallery/"+url);
  }

  ngOnInit() {
    this.loader=true;
    this.page=false;
  }

}
