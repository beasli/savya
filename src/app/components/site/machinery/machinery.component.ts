import { IMAGE } from './../../../../config';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { SUBCATEGORY } from 'src/config';

@Component({
  selector: 'app-machinery',
  templateUrl: './machinery.component.html',
  styleUrls: ['./machinery.component.css']
})
export class MachineryComponent implements OnInit {
slider_imgs = {};
eventraiser:number;
data:any;
slideConfig = {
  "slidesToShow": 2,
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
};;
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
img_url=IMAGE;
  videos = [];
  exclusive = [];
  categories: any;
  constructor(private api: ApiService, private route: ActivatedRoute, private DOM: DomSanitizer) { 
    this.route.params.subscribe(
      params=>{
        this.api.Post(SUBCATEGORY, {category_id: params.id} ).then(data  => {
          this.data = data['data'];
        });
        this.api.changelg(1);
      });
    this.data2['body'].forEach(childObj => {
        if (childObj.category === 'video_banners') {
          this.videos.push(childObj['video_banners']);
          
        }
        else if (childObj.category === 'exclusive_banners') {
          this.exclusive.push(childObj['exclusive_banners']);
        }
        else if (childObj.category === 'categories') {
          this.categories = childObj['categories'];
        }
     });
     console.log(this.videos);
     console.log(this.exclusive);
     console.log(this.categories);
  }

  bypass(url){
    return this.DOM.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.api.changelg(0);
  }

  ngOnInit(): void {
  }

}
