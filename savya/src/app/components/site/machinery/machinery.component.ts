import { IMAGE, MACHINE, BANNER } from './../../../../config';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SUBCATEGORY } from 'src/config';

@Component({
  selector: 'app-machinery',
  templateUrl: './machinery.component.html',
  styleUrls: ['./machinery.component.css']
})
export class MachineryComponent implements OnInit {
slider_imgs:any;
url = IMAGE+"machinarybanner/";
manufacture = IMAGE+"users/";
eventraiser:number;
data:any;
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



slideConfig3 = {
  "slidesToShow": 3,
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


img_url=IMAGE;
imagemodel=IMAGE+'machinerygallery/'
  videos = [];
  exclusive = [];
  categories: any;
  callshadow:any;
  machinedata:any;
  mostselling: any;
  manufacturer: any;
  models: any;
  Partners: any;
  Banner: any;
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private DOM: DomSanitizer) { 
    this.route.params.subscribe(
      params=>{

        this.api.Post(SUBCATEGORY, {category_id: params.id} ).then(data  => {
          this.data = data['data'];
        });

        this.api.Get(MACHINE).then(data=>{
          this.machinedata = data['body'];

          data['body'].forEach(childObj => {
            if (childObj.category === 'machinery_banners') {
              this.slider_imgs = childObj['machinery_banners'].filter(slide => slide.place === 'Website');
             // console.log(this.slider_imgs);
             // console.log(IMAGE+"machinarybanner/"+this.slider_imgs[0].image)
            }
            else if (childObj.category === 'exclusive_banners') {
              this.exclusive = childObj['exclusive_banners'].filter(slide => slide.place === 'Website');
            }
            else if (childObj.category === 'Machinery_product') {
              this.mostselling = childObj['Machinery_product'];
              console.log(this.mostselling);
            }
            else if (childObj.category === 'machinery_model') {
              this.models = childObj['machinery_model']
            }
            else if (childObj.category === 'manufacture') {
              this.manufacturer = childObj['manufacture'];

            }else if (childObj.category === 'categories') {
              this.categories = childObj['categories'];
              console.log(this.categories)
            }else if (childObj.category === 'machinery_partner ') {
              this.Partners = childObj['machinery_partner'];
            }
         });

            if(this.slider_imgs && this.categories){
              console.log('hello')
              console.log(this.categories);
              console.log(this.slider_imgs);
              this.slider_imgs.forEach(childObj =>{
                let a = this.categories.find(slide => slide.category_id == childObj.category_id);
                console.log(a);
                childObj.category = a.subcategory;
              });
              console.log(this.slider_imgs);
            }

          
        })
        
      });

     console.log(this.videos);
     console.log(this.exclusive);
     
  }

  bypass(url){
    return this.DOM.bypassSecurityTrustResourceUrl(url);
  }


  go(slide, value) {
    if (value == 1)
    {
    this.router.navigate(['/machinery',slide.subcategory.replace(/ /g, "-")], { queryParams:{ 'page' :1 ,'subcategory_id': slide.id}});
    } else if(value==0){
      this.router.navigate(['/machinery',slide.name.replace(/ /g, "-")], { queryParams:{ 'page' :1 ,'manufacture_id': slide.manufacture_id}});
    }
  }
 

  ngOnInit(): void {
  }

}
