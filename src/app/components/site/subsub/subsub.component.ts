import { IMAGE, BANNER } from './../../../../config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUBCATEGORYTYPE, CRAUSEL, CATEGORY, SUBCATEGORY } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-subsub',
  templateUrl: './subsub.component.html',
  styleUrls: ['./subsub.component.css']
})
export class SubsubComponent implements OnInit {
subid:any;
data:any;
baseUrl:any;
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
// baseUrl:any="http://admin.savyajewelsbusiness.com/admin/";
  manufacturer: any;
  category: any;
  subcategory: any;
  Banner: any;
  idm:any;
  constructor(private route:ActivatedRoute,private api:ApiService,
    private sanitizer: DomSanitizer,
    private router:Router) {
    this.route.params.subscribe(params => {
      this.subid = params.id;
      this.getsubsub();
      if(params.idm){
        this.idm = params.idm;
        console.log('idm');
        this.baseUrl = IMAGE+'banner/';
        this.api.Post(BANNER, {user_id:params.idm, type: 5}).then( data =>
          {this.Banner = data['data'].filter(slide => slide.place === 'Website');
        });
      }
    });

  
   }

   getsubsub() {
    this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.subid } ).then(data  => {
      this.page=true;
      this.loader=false;
      this.data = data['data'];
      console.log(data);

      this.api.Post(CATEGORY, {} ).then(data  => {
        let result = data['data'].find(x => x.id == this.data[0]['category_id']);
        this.category = result['category'];
        console.log(this.category);
     }).catch(d=>{console.log(d);});

     this.api.Post(SUBCATEGORY, {category_id: this.data[0]['category_id']} ).then(data  => {
  
      let result = data['data'].find(x => x.id == this.data[0]['subcategory_id']);
      this.subcategory = result['subcategory'];
      console.log(this.subcategory);
    }).catch(d=>{
        console.log(d);
      });
     }).catch(d=>{
      console.log(d);
    });
  }
  getlink(s):SafeStyle {
    // console.log("in getlink function");
    // console.log(this.baseUrl);
    return this.sanitizer.bypassSecurityTrustStyle('url('+ IMAGE + 'subsubcategory/' + s + ')');
  }
  gofilter(value) {
    console.log(value);
    if(!this.idm){
    this.router.navigate(['/filter', value],{queryParams:{'page':1}});}
    else{
      this.router.navigate(['/filter', value],{queryParams:{'page':1,'manufacturer':this.idm}});
    }
  }

  ngOnInit(): void {
    this.loader=true;
    this.page=false;
  }

}
