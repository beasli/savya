import { CategoryPipe, SubCategoryPipe } from './../../components/site/slug.pipe';
import { Component, OnInit } from '@angular/core';
import { SUBCATEGORY, CATEGORY, IMAGE, BANNER, NAVIGATION } from 'src/config';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  data:any;
  category: any;
  img_url=IMAGE;
  callshadow:any;
  id:any;
  mid:any
  Banner: any;
  catall:any;
  name: any;
  mname: any;
 // catid: any;
  
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router, private sanitizer: DomSanitizer,private catpipe: CategoryPipe,private subcatpipe: SubCategoryPipe) { 
    this.api.Get(NAVIGATION).then(data => {
      this.catall = data['data'];
    this.route.params.subscribe(
      params=>{

        //  this.id = this.catall.find(x => x.category.toLowerCase() == params.subcategory.slice(0,-8));

        this.name = params.subcategory;
         // this.id = this.id.category_id;
          if(!params.idm){
            
            this.route.queryParamMap.subscribe(params =>{
              this.id =  params.get('category');
            //  this.mid = params.get('manufacture');
console.log('heeloom');

          this.api.Post(SUBCATEGORY, {category_id: this.id} ).then(data  => {
          this.data = data['data'];

          this.api.Post(CATEGORY, {} ).then(data  => {
          let result = data['data'].find(x => x.id == this.data[0]['category_id']);
          this.category = result['category'];
          console.log(this.category);
          }).catch(d=>{console.log(d);});
        });
      });

          }

          if (params.idm) {
            this.mname = params.idm;
            this.route.queryParamMap.subscribe(params =>{
           this.id =  params.get('category');
           this.mid = params.get('manufacture');
           console.log('heelo');



           
           this.api.Post(SUBCATEGORY, {category_id: this.id,manufacture_id: this.mid} ).then(data  => {
            this.data = data['data'];
            this.api.Post(CATEGORY, {} ).then(data  => {
            let result = data['data'].find(x => x.id == this.data[0]['category_id']);
            this.category = result['category'];
            console.log(this.category);
             }).catch(d=>{console.log(d);});
             this.api.Post(BANNER, {user_id:this.mid, type: 4}).then( data =>
              {this.Banner = data['data'].filter(slide => slide.place === 'Website');});
           });
            });

           }
        });
        
      });
  }

  go(value,id){
    if(this.mid){
      this.router.navigate(['jewelry/manufacture', this.mname,this.name ,this.subcatpipe.transform(value)],{queryParams:{'manufacture':this.mid,'subcategory':id}});
    }
    else{
      this.router.navigate(['jewelry/',this.name,this.subcatpipe.transform(value)],{queryParams:{'subcategory':id}});
    }
  }


  getlink(s):SafeStyle {
    s = s.replace(/ /g, "%20");
    s = s.replace(/\(/g, "%28");
    s = s.replace(/\)/g, "%29");
    return this.sanitizer.bypassSecurityTrustStyle('url('+ IMAGE + 'subcategory/' + s + ')');
  }

  ngOnInit(): void {
  }

}
