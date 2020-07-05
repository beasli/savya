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
  data2 = {
    "body": [
      {
        "category": "app_banners",
        "app_banners": [
          {
            "id": 8,
            "category": "2",
            "subcategory": "28",
            "image": "Machine1.jpg",
            "status": "1",
            "created_at": null,
            "updated_at": null
          },
          {
            "id": 9,
            "category": "1",
            "subcategory": "3",
            "image": "Machine2.jpg",
            "status": "1",
            "created_at": null,
            "updated_at": null
          },
          {
            "id": 10,
            "category": "1",
            "subcategory": "2",
            "image": "Machine3.jpg",
            "status": "1",
            "created_at": null,
            "updated_at": null
          },
          {
            "id": 11,
            "category": "1",
            "subcategory": "9",
            "image": "Machine4.jpg",
            "status": "1",
            "created_at": null,
            "updated_at": null
          },
          {
            "id": 11,
            "category": "1",
            "subcategory": "9",
            "image": "Machine5.jpg",
            "status": "1",
            "created_at": null,
            "updated_at": null
          }
        ]
      },
      {
        "category": "categories",
        "categories": [
          {
            "id": 1,
            "category": "DIAMOND FACETING MACHINES",
            "description": "Gold Jewellery",
            "menu_id": 0,
            "image": "https://4.imimg.com/data4/PE/CH/MY-123084/jewelry-casting-machine-500x500.jpg",
            "status": "1",
            "created_at": "2020-01-07 06:50:56",
            "updated_at": "2020-01-07 06:50:56"
          },
          {
            "id": 2,
            "category": "Diamond Faceting",
            "description": "Diamond Jewellery",
            "menu_id": 1,
            "image": "https://3.imimg.com/data3/SS/DT/MY-3139714/hand-machine-tools-250x250.jpg",
            "status": "1",
            "created_at": "2020-01-07 06:51:18",
            "updated_at": "2020-01-07 06:51:18"
          }
        ]
      },
      {
        "category": "video_banners",
        "video_banners": {
          "id": 2,
          "imagePreview": "https://s3.ap-south-1.amazonaws.com/www.savyajewelsbusiness.com/video/otherassets/Screenshot+2020-03-15+at+12.29.46+PM.png",
  
          "image": "https://s3.ap-south-1.amazonaws.com/www.savyajewelsbusiness.com/video/videoplay.mp4"
        }
      },
      {
        "category": "video_banners",
        "video_banners": {
          "id": 2,
          "imagePreview": "https://s3.ap-south-1.amazonaws.com/www.savyajewelsbusiness.com/video/otherassets/Screenshot+2020-03-15+at+12.29.18+PM.png",
          "image": "https://s3.ap-south-1.amazonaws.com/www.savyajewelsbusiness.com/video/videoplayback.mp4"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 2,
          "title": "Our Best Jewellery Collection",
          "description": "Our Best Jewellery Collection",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "9",
          "status": "1",
          "created_at": "2020-01-30 11:01:06",
          "updated_at": "2020-01-10 07:23:06"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 3,
          "title": "Our Machinery Collection",
          "description": "Check our best machinery Product",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "8",
          "status": "1",
          "created_at": "2020-01-30 11:00:53",
          "updated_at": "2020-01-10 07:33:31"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 4,
          "title": "Our Machinery Collection",
          "description": "Check our best machinery Product",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "5",
          "status": "1",
          "created_at": "2020-01-10 07:35:15",
          "updated_at": "2020-01-10 07:35:15"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 4,
          "title": "Our Machinery Collection",
          "description": "Check our best machinery Product",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "5",
          "status": "1",
          "created_at": "2020-01-10 07:35:15",
          "updated_at": "2020-01-10 07:35:15"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 4,
          "title": "Our Machinery Collection",
          "description": "Check our best machinery Product",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "5",
          "status": "1",
          "created_at": "2020-01-10 07:35:15",
          "updated_at": "2020-01-10 07:35:15"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 4,
          "title": "Our Machinery Collection",
          "description": "Check our best machinery Product",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "5",
          "status": "1",
          "created_at": "2020-01-10 07:35:15",
          "updated_at": "2020-01-10 07:35:15"
        }
      },
      {
        "category": "exclusive_banners",
        "exclusive_banners": {
          "id": 4,
          "title": "Our Machinery Collection",
          "description": "Check our best machinery Product",
          "image": "../../../../assets/images/logo-bw.png",
          "category": "1",
          "sub_catagory": "5",
          "status": "1",
          "created_at": "2020-01-10 07:35:15",
          "updated_at": "2020-01-10 07:35:15"
        }
      }
    ],
    "url": "http://savyajewels.net/Machinery/",
    "product_url": "http://newapp.savyajewels.net/img/product",
    "status": 200
  };
  videos:any;
  models = [{image: 'model_1.jpg'}, {image: 'model_2.jpg'}]
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
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
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
          }else if (childObj.category === 'video') {
            this.partner = childObj['video'];
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
