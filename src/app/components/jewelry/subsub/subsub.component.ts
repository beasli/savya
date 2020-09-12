import { IMAGE, BANNER, NAVIGATION } from './../../../../config';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUBCATEGORYTYPE, CATEGORY, SUBCATEGORY } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CategoryPipe, SubCategoryPipe } from '../slug.pipe';
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
  manufacturer: any;
  category: any;
  subcategory: any;
  Banner: any;
  idm:any;
  catall: any;
  name:any;
 ncategory:any;
 nsubcategory:any;
  mname: any;
  sid:any;
  constructor(private route:ActivatedRoute,private api:ApiService,
    private sanitizer: DomSanitizer,
    private router:Router,private catpipe: CategoryPipe,private subcatpipe: SubCategoryPipe) {

      this.api.Get(NAVIGATION).then(data => {


        this.catall = data['data'];

    this.route.params.subscribe(params => {

      

      console.log(params.subcategory.slice(0,-8));
      console.log(params.subsubcategory.slice(8));
      this.ncategory = params.subcategory;
      this.nsubcategory = params.subsubcategory;
      if(params.idm){
        this.mname = params.idm;
        this.route.queryParamMap.subscribe(params =>{
        this.sid = params.get('subcategory');
         this.idm = params.get('manufacture');
        this.getsubsub();
        this.baseUrl = IMAGE+'banner/';
        this.api.Post(BANNER, {user_id: this.idm, type: 5}).then( data =>
          {this.Banner = data['data'].filter(slide => slide.place === 'Website');
        });
      });
      } else {
        this.route.queryParamMap.subscribe(params =>{
            this.sid = params.get('subcategory');
        this.getsubsub();
      }); 
      }
    }); 
  });

  
   }

   getsubsub() {
     if(this.idm){
    this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.sid,manufacture_id: this.idm  } ).then(data  => {
      this.page=true;
      this.loader=false;
      this.data = data['data'];
      this.api.Post(CATEGORY, {} ).then(data  => {
        let result = data['data'].find(x => x.id == this.data[0]['category_id']);
        this.category = result['category'];
     }).catch(d=>{});
     this.api.Post(SUBCATEGORY, {category_id: this.data[0]['category_id']} ).then(data  => {
      let result = data['data'].find(x => x.id == this.data[0]['subcategory_id']);
      this.subcategory = result['subcategory'];
    }).catch(d=>{});
     }).catch(d=>{});}
    if(!this.idm){
      this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.sid} ).then(data  => {
        this.page=true;
        this.loader=false;
        this.data = data['data'];
        this.api.Post(CATEGORY, {} ).then(data  => {
          let result = data['data'].find(x => x.id == this.data[0]['category_id']);
          this.category = result['category'];
       }).catch(d=>{});
       this.api.Post(SUBCATEGORY, {category_id: this.data[0]['category_id']} ).then(data  => {
        let result = data['data'].find(x => x.id == this.data[0]['subcategory_id']);
        this.subcategory = result['subcategory'];
      }).catch(d=>{});
       }).catch(d=>{});
      }
}
  getlink(s):SafeStyle {
    s = s.replace(/ /g, "%20");
    s = s.replace(/\(/g, "%28");
    s = s.replace(/\)/g, "%29");
    return this.sanitizer.bypassSecurityTrustStyle('url('+ IMAGE + 'subsubcategory/' + s + ')');
  }
  gofilter(value,id) {
    if(!this.idm){
    this.router.navigate(['jewelry/',this.ncategory,this.nsubcategory,this.subcatpipe.transform(value)],{queryParams:{'page':1,'subsubcategory':id}});}
    else{
      this.router.navigate(['jewelry/manufacture', this.mname,this.ncategory,this.nsubcategory,this.subcatpipe.transform(value)],{queryParams:{'page':1,'manufacturer':this.idm,'subsubcategory':id}});
    }
  }

  ngOnInit(): void {
    this.loader=true;
    this.page=false;
  }

}
