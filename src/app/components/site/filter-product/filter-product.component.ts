import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SUBCATEGORYTYPE, PRODUCTLIST, NAVIGATION } from 'src/config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {
  subid: any;
   url :any;
  data:any;
  products:any;
  wish:any;
  jewelery_for:any;
  material:any;
  purity:any;
  price:any;
  jewelery_type:any;
  filter:any;
  div:boolean=false;
  alert:boolean=false;
  loader:boolean;
  page:boolean;
  subcategory:any;
  subsubcategory:any;
  category:any;
  message:string="NO PRODUCT AVAILABLE";
  f:any;
  drop:any;
  @ViewChild('addclosebutton') addclosebutton;
@ViewChild('deleteclosebutton') deleteclosebutton;
  current_page: any;
  pages: any;
  manufacture: string;
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router,private http:HttpClient) {
    this.drop=this.api.drop; 


    this.api.Get(NAVIGATION).then(data => {

      this.category = data['data'];

    this.route.params.subscribe(params => {

      this.category = this.category.find(x => x.category.toLowerCase()  == params.cat);
    
      this.subcategory = this.category.subcategory.find(x => x.subcategory == params.sub.replace(/-/g, " "));
    
      this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.subcategory.id} ).then(data  => {
        this.subsubcategory = data['data'];
        this.subsubcategory = this.subsubcategory.find(x => x.title == params.subsub.replace(/-/g, " "));
      this.route.queryParamMap.subscribe(params =>{
      this.current_page = params.get('page');
      this.manufacture = params.get('manufacturer');
    
      this.current_page = Number(this.current_page);
      this.getProduct(this.subsubcategory.id,this.current_page);
      
          });
        });
      });
    });
  }
  getProduct(value,page=1)
  {
    this.loader=true;
    this.page=false;
    this.f=this.api.getfilter();
    if(!this.manufacture){
    this.api.Post2(PRODUCTLIST,JSON.stringify(this.f),{'subsubcategory_id':value,'page':page}).then(data  => {
      this.page=true;
      this.loader=false;
      this.div=true;
      this.alert=false
      this.products = data['data'];
      if(this.products.length){
        this.products.forEach(element => {
          element.gross = 0;
          if(element.weight.Gold){element.gross += Number(element.weight.Gold)};
          if(element.weight.Silver){element.gross += Number(element.weight.Silver)};
          if(element.weight.Diamond){element.gross += Number(element.weight.Diamond)*0.2};
          if(element.weight.Stone){element.gross += Number(element.weight.Stone)*0.2};
          if(element.weight.Platinum){element.gross += Number(element.weight.Platinum)};
          console.log(element.gross);
        });
      }
      this.pages = Math.ceil(data['pagination']/16);
      this.url = data['url'] + '/';
       }).catch(d=>{

        this.api.Post2(PRODUCTLIST,{},{'subsubcategory_id':value,'page':page}).then(data  => {
          this.page=true;
          this.loader=false;
          this.div=true;
          this.alert=false
          this.products = data['data'];
          if(this.products.length){
            this.products.forEach(element => {
              element.gross = 0;
              if(element.weight.Gold){element.gross += Number(element.weight.Gold)};
              if(element.weight.Silver){element.gross += Number(element.weight.Silver)};
              if(element.weight.Diamond){element.gross += Number(element.weight.Diamond)*0.2};
              if(element.weight.Stone){element.gross += Number(element.weight.Stone)*0.2};
              if(element.weight.Platinum){element.gross += Number(element.weight.Platinum)};
              console.log(element.gross);
            });
          }
        
          this.url = data['url'] + '/';
          
           });
        this.page=true;
        this.loader=false;
         this.div=false;
         this.alert=true;
       
      });}
      else{
        this.api.Post2(PRODUCTLIST,JSON.stringify(this.f),{'subsubcategory_id':value,'page':page,'manufacture_id':this.manufacture}).then(data  => {
          this.page=true;
          this.loader=false;
          this.div=true;
          this.alert=false
          this.products = data['data'];
          if(this.products.length){
            this.products.forEach(element => {
              element.gross = 0;
              if(element.weight.Gold){element.gross += Number(element.weight.Gold)};
              if(element.weight.Silver){element.gross += Number(element.weight.Silver)};
              if(element.weight.Diamond){element.gross += Number(element.weight.Diamond)*0.2};
              if(element.weight.Stone){element.gross += Number(element.weight.Stone)*0.2};
              if(element.weight.Platinum){element.gross += Number(element.weight.Platinum)};
              console.log(element.gross);
            });
          }
          this.pages = Math.ceil(data['pagination']/16)
          this.url = data['url'] + '/';
          
           }).catch(d=>{
    
            this.api.Post2(PRODUCTLIST+"?subsubcategory_id="+value,{},{'subsubcategory_id':value,'page':page,'manufacture_id':this.manufacture}).then(data  => {
              this.page=true;
              this.loader=false;
              this.div=true;
              this.alert=false
              this.products = data['data'];
              if(this.products.length){
                this.products.forEach(element => {
                  element.gross = 0;
                  if(element.weight.Gold){element.gross += Number(element.weight.Gold)};
                  if(element.weight.Silver){element.gross += Number(element.weight.Silver)};
                  if(element.weight.Diamond){element.gross += Number(element.weight.Diamond)*0.2};
                  if(element.weight.Stone){element.gross += Number(element.weight.Stone)*0.2};
                  if(element.weight.Platinum){element.gross += Number(element.weight.Platinum)};
                  console.log(element.gross);
                });
              }
              this.url = data['url'] + '/';
          
               });
            this.page=true;
            this.loader=false;
             this.div=false;
             this.alert=true;
          });
      }
  }
  pagechanged(){
    if(!this.manufacture){
    this.router.navigate(['',this.category.category.toLowerCase(),this.subcategory.subcategory.replace(/ /g, "-"),this.subsubcategory.title.replace(/ /g, "-")], { queryParams: { page: this.current_page}});
    } else{
      this.router.navigate(['',this.manufacture,this.category.category.toLowerCase(),this.subcategory.subcategory.replace(/ /g, "-"),this.subsubcategory.title.replace(/ /g, "-")], { queryParams: { page: this.current_page,manufacturer:this.manufacture}});
    }
  }
  go(value) {
    this.api.godetail(value);
  }
 

  wishlist(pid) {
     if(this.drop==0)
     {
       
      this.api.setGoto();
      this.api.onSuccess('Please Login First to Continue');
     }
     else if(this.drop==1)
    {
      this.api.checkWishlist(pid);
    }
   }
   deleteWishlist(pid)
   {
       this.api.deleteWishlist(pid);
   }
   checkHeart(pid)
  {

    this.wish = this.api.getWishlist();
    if (this.wish) {
            let result = this.wish.find(x => x.product_id === pid);
            if (result)
            { 
              return true;
            }
            else
            {
              return false;      
            } 
      }
      else{
        return false;
      }
  }
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.getlogin.subscribe(data => {
      this.drop=data; 
     });

    this.f=this.api.getfilter();
   if(!this.f)
    {

      let initial={"menu":{"jewelery_for":[],"jewelery_type":[],"material":[],"price":{},"purity":[]}};
      this.api.setfilter(initial);
    }

        this.api.filterChange.subscribe(data=>{
             this.f=this.api.getfilter();
                      if(this.f)
                    {
                          this.getProduct(this.subsubcategory.id);
                    }
                    else if(!this.f)
                    {

                      let initial={"menu":{"jewelery_for":[],"jewelery_type":[],"material":[],"price":{},"purity":[]}};
                      this.api.setfilter(initial);
                      this.getProduct(this.subsubcategory.id);
                    }
          })
  }
  
}