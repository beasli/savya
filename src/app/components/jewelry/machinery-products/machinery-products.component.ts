import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MACHINESEARCH, IMAGE } from 'src/config';

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
  title: any;
  slider_imgs: any;
  url2 = IMAGE+"machinarybanner/"

  constructor(private api: ApiService, private route: ActivatedRoute,
    private router:Router) {

    this.route.params.subscribe(data=>{this.title = data.id})
      this.route.queryParamMap.subscribe(params =>{
        this.current_page = params.get('page');
        this.current_page = Number(this.current_page);
      //  this.title
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
      this.slider_imgs = data['Machinery Banners'].filter(slide => slide.place === 'Website');;
      this.pages = Math.ceil(data['pagination']/16);
      this.url = data['url'] + '/';
       }).catch(d=>{
        this.page=true;
        this.loader=false;
         this.div=false;
         this.alert=true;
      });}
      else{
        this.api.Post(MACHINESEARCH,{'manufacture_id':Number(this.manufacture),'page':page}).then(data  => {
          this.page=true;
          this.loader=false;
          this.div=true;
          this.alert=false
          this.products = data['data'];
          this.slider_imgs = data['Machinery Banners'].filter(slide => slide.place === 'Website');;
          this.pages = Math.ceil(data['pagination']/16)
          this.url = data['url'] + '/';
           }).catch(d=>{
          });
      }
  }
  go(argument){
    
    this.router.navigate(['/jewelry/machinery', this.title,argument.machinery_name.replace(/ /g, "-")],{queryParams:{'detail':argument.machinery_id}});
  }

  pagechanged(){
    if(!this.manufacture){
      
      this.router.navigate(['/jewelry/machinery', this.title], { queryParams:{ page :this.current_page ,'subcategory_id': this.subcategory}});
    } else{
    
      this.router.navigate(['/jewelry/machinery', this.title], { queryParams: { page: this.current_page,'manufacture_id':this.manufacture}});
    }
  }

  ngOnInit(): void {
  }

}
