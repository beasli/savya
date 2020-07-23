import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MACHINESEARCH } from 'src/config';
import { Console } from 'console';

@Component({
  selector: 'app-machinery-products',
  templateUrl: './machinery-products.component.html',
  styleUrls: ['./machinery-products.component.css']
})
export class MachineryProductsComponent implements OnInit {
  current_page: any;
  subcategory: any;
  manufacture: any;
  loader: boolean;
  page: boolean;
  div: boolean;
  alert: boolean;
  products: any;
  pages: number;
  url: string;

  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router,private http:HttpClient) {
      this.route.queryParamMap.subscribe(params =>{
        this.current_page = params.get('page');
        this.current_page = Number(this.current_page);
        this.subcategory = params.get('subcategory_id');
        this.manufacture = params.get('manufacture_id');
        console.log(this.manufacture);
        this.getproducts(this.current_page);
      });
  }

  getproducts(page=1){
    this.loader=true;
    this.page=false;
    if(!this.manufacture){
    this.api.Post(MACHINESEARCH,{'subcategory_id':this.subcategory,'page':page}).then(data  => {
      this.page=true;
      this.loader=false;
      this.div=true;
      this.alert=false
      this.products = data['data'];
      this.pages = Math.ceil(data['pagination']/16);
      console.log(this.pages);
     // console.log(this.products);
      this.url = data['url'] + '/';
      console.log(this.url);
       }).catch(d=>{
        this.page=true;
        this.loader=false;
         this.div=false;
         this.alert=true;
        console.log(d);
      });}
      else{
        this.api.Post(MACHINESEARCH,{'manufacture_id':Number(this.manufacture),'page':page}).then(data  => {
          this.page=true;
          this.loader=false;
          this.div=true;
          this.alert=false
          this.products = data['data'];
          this.pages = Math.ceil(data['pagination']/16)
          console.log(this.pages);
         // console.log(this.products);
          this.url = data['url'] + '/';
          console.log(this.url);
           }).catch(d=>{
          });
      }
  }
  go(argument){
    this.router.navigate(['/products/machinery', argument]);
  }

  pagechanged(){
    if(!this.manufacture){
      console.log("no man");
      this.router.navigate(['/products/machinery'], { queryParams:{ page :this.current_page ,'subcategory_id': this.subcategory}});
    } else{
      console.log("hi man");
      this.router.navigate(['/products/machinery'], { queryParams: { page: this.current_page,'manufacture_id':this.manufacture}});
    }
  }

  ngOnInit(): void {
  }

}
