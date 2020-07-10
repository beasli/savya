import { Component, OnInit } from '@angular/core';
import { SUBCATEGORY, CATEGORY, IMAGE, BANNER } from 'src/config';
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
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router, private sanitizer: DomSanitizer) { 
    this.route.params.subscribe(
      params=>{
        this.api.Post(SUBCATEGORY, {category_id: params.id} ).then(data  => {
          this.data = data['data'];

          this.api.Post(CATEGORY, {} ).then(data  => {
            let result = data['data'].find(x => x.id == this.data[0]['category_id']);
            this.category = result['category'];
            console.log(this.category);
         }).catch(d=>{console.log(d);});

          if (params.idm) {
           this.mid = params.idm;
           this.api.Post(BANNER, {user_id:params.idm, type: 4}).then( data =>
            {this.Banner = data['data'].filter(slide => slide.place === 'Website');
          });
         }
        });
      });
  }

  go(value){
    if(this.mid){
      this.router.navigate(['manufacture', this.mid, 'subsub', value]);
    }
    else{
      this.router.navigate(['subsub', value]);
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
