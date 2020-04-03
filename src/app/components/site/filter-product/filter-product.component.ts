import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SUBCATEGORYTYPE, PRODUCTLIST, PRODUCTFILTERMENU, PRODUCTFILTER, ORDERBY } from 'src/config';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {
  @Output() filterChange:EventEmitter<string> = new EventEmitter();
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
  message:string="NO PRODUCT AVAILABLE";
  f:any;
  drop:any;
  @ViewChild('addclosebutton') addclosebutton;
@ViewChild('deleteclosebutton') deleteclosebutton;
  constructor(private api: ApiService, private route: ActivatedRoute,private router:Router) {
    this.drop=this.api.drop; 
    this.route.params.subscribe(params => {
      this.subid = params.id;
      this.getProduct(this.subid);
      // this.getsubsub();
        //filter update sub category
              let f=this.getfilter();
              f.menu.subcategory= +this.subid;
              this.setfilter(f);
       //end filter update//

    //  console.log(params);
      });

      this.api.Post(PRODUCTFILTERMENU, {} ).then(data  => {
       this.jewelery_for=data['menu'].jewelery_for;
       console.log(data);
        this.material=data['menu'].material;
        this.purity=data['menu'].purity;
        this.price=data['menu'].price;
        this.jewelery_type=data['menu'].jewelery_type;
        console.log(this.price);
       }).catch(d=>{
        console.log(d);
      });
     
  }
 
  // getsubsub() {
  //   this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.subid } ).then(data  => {
  //     this.data = data['data'];

  //     console.log(data);
  //    }).catch(d=>{
  //     console.log(d);
  //   });
  // }
  getProduct(value)
  {
    this.loader=true;
    this.page=false;
    this.api.Post(PRODUCTLIST, {subsubcategory_id: value } ).then(data  => {
      this.page=true;
      this.loader=false;
      this.div=true;
      this.alert=false
      this.products = data['data'];
     // console.log(this.products);
      this.url = data['url'] + '/';
      console.log(this.url);
       }).catch(d=>{
        this.page=true;
        this.loader=false;
         this.div=false;
         this.alert=true;
        console.log(d);
      });
  }
  go(value) {
    this.api.godetail(value);
  }
  checkCart(pid)
  {
      let check=this.api.checkCart(pid);
     // console.log(check);
      return check;
 }
 filterApi(value)
 {
  this.loader=true;
  this.page=false;
  this.api.Post(PRODUCTFILTER,  value  ).then(data  => {
    this.page=true;
    this.loader=false;
    this.div=true;
      this.alert=false
    console.log(data);
    this.products = data['data'];
    console.log(this.products);
   this.url = data['url'] + '/';
   console.log(this.url);
     }).catch(d=>{
      this.page=true;
      this.loader=false;
      this.div=false;
      this.alert=true;
      console.log(d);
    });
 }
 orderByAPI(value)
 {
  this.api.Post(ORDERBY+this.subid,"orderby="+value).then(data  => {
    this.div=true;
      this.alert=false
    console.log(data);
    this.products = data['data'];
    console.log(this.products);
   this.url = data['url'] + '/';
   console.log(this.url);
     }).catch(d=>{
      this.div=false;
      this.alert=true;
      console.log(d);
    });
 }
 orderBy(event)
  {
    let s:any;
    if(event==1)
    {
      s="DSC";
      this.orderByAPI(s);
    }
    else if(event==2)
    {
      s="ASC";
      this.orderByAPI(s);
    }
    else
    {
      s=event.target.value;
      this.orderByAPI(s);
    }
  }
 qtyUpdate(pid,value)
 {
      this.api.qtyUpdate(pid,value);
 }
 quantity(pid)
 {
      let cart=this.api.getCart();
      if(cart)
    {
            let result=cart.find(x => x.product_id == pid);
            // console.log(result);
            if(result)
            { 
                  let cartId=result.cart_id;
                  let c=Number(result.count);
                  return c;
              } 
              else{
                return(0);
              }
      }
 }
 addToCart(s)
  {
    this.api.addToCart(s);
  }
  wishlist(pid) {
    // console.log("in wishlist");
     //console.log(pid);
     if(this.drop==0)
     {
        if(confirm('Please Login first'))
        {
            this.router.navigate(['/login']);
            return false;
        }
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

    //console.log("checkheart");
    this.wish = this.api.getWishlist();
    if (this.wish) {
            let result = this.wish.find(x => x.product_id === pid);
        //  console.log("result="+result);
            if (result)
            { 
             // console.log("present");
              return true;
            
            }
            else
            {
              //console.log("not present");
              return false;
              
            } 
      }
      else{
        //console.log("not present");
        return false;
      }
  }
getprice(event){
  console.log(event);
  let min;
  let max;
  let res:any;
  let a=event['target']['value'];
  let f= this.getfilter();
    if(a.length<=5)
    {
       min=a;
       max=1000000;
       f.menu.price.min=Number(min);
       f.menu.price.max=Number(max);
       this.setfilter(f);
    }
    else
    {
       res = a.split("-");
        min =res[0];
        max  =res[1]
        f.menu.price.min=Number(min);
        f.menu.price.max=Number(max);
        this.setfilter(f);
    }
}
changefilter(event,value)
{
  let name=event.target.name;
  console.log(name);
  let f= this.getfilter();
  console.log(event);
  console.log(value);
  if(name=="jewelery_for")
  {
            console.log("if condition");
            console.log(f.menu.jewelery_for);
            if(f.menu.jewelery_for.length>0)
            {
              let result=f.menu.jewelery_for.find(x => x == value);
              if(result)
              {
                f.menu.jewelery_for.pop(value);
                this.setfilter(f);
              }
              else
              {
                f.menu.jewelery_for.push(value);
                this.setfilter(f);
              }
          }
          else
          {
            f.menu.jewelery_for.push(value);
            this.setfilter(f);
          }
  }
  else if(name=="jewelery_type")
  { 
    f.menu.jewelery_type=[]
    f.menu.jewelery_type.push(value);
    this.setfilter(f);     
  }
  else if(name=="purity")
  {
            console.log("if condition");
            console.log(f.menu.purity);
            if(f.menu.purity.length>0)
            {
              let result=f.menu.purity.find(x => x == value);
              if(result)
              {
                f.menu.purity.pop(value);
                this.setfilter(f);
              }
              else
              {
                f.menu.purity.push(value);
                this.setfilter(f);
              }
          }
          else
          {
            f.menu.purity.push(value);
            this.setfilter(f);
          }
  }
  else if(name=="purity")
  {
            console.log("if condition");
            console.log(f.menu.purity);
            if(f.menu.purity.length>0)
            {
                  let result=f.menu.purity.find(x => x == value);
                  if(result)
                  {
                    f.menu.purity.pop(value);
                    this.setfilter(f);
                  }
                  else
                  {
                    f.menu.purity.push(value);
                    this.setfilter(f);
                  }
          }
          else
          {
            f.menu.purity.push(value);
            this.setfilter(f);
          }
  }
  else if(name=="material")
  {
            console.log("if condition");
            console.log(f.menu.material);
            if(f.menu.material.length>0)
            {
                  let result=f.menu.material.find(x => x == value);
                  if(result)
                  {
                    f.menu.material.pop(value);
                    this.setfilter(f);
                  }
                  else
                  {
                    f.menu.material.push(value);
                    this.setfilter(f);
                  }
          }
          else
          {
            f.menu.material.push(value);
            this.setfilter(f);
          }
  }

}
checkedjewelery_type(value)
{
    let f= this.getfilter();
    if(f.menu.jewelery_type==value)
    {
      return true;
    }
    else
    {
      return false;
    }
}
checkedjewelery_for(value)
{
  let f= this.getfilter();
  let result=f.menu.jewelery_for.find(x => x == value);
  if(result)
  {
   return true;
  }
  else
  {
    return false;
  }

}
checkedmaterial(value)
{
  let f= this.getfilter();
  let result=f.menu.material.find(x => x == value);
  if(result)
  {
   return true;
  }
  else
  {
    return false;
  }
}
checkedpurity(value)
{
  let f= this.getfilter();
  let result=f.menu.purity.find(x => x == value);
  if(result)
  {
   return true;
  }
  else
  {
    return false;
  }
}
checkedprice(min)
{
    
      let f= this.getfilter();
       
                if(f.menu.price.min==min)
                {
                  return true;
                }
                else
                {
                    return false;
                }
      
        
       

}
setfilter(value)
{
  this.filterApi(JSON.stringify(value));
  localStorage.setItem('filter',JSON.stringify(value));
  this.filterChange.emit("cartUpdate"+Date.now()); 
}
getfilter()
{
  return JSON.parse(localStorage.getItem('filter'));
}
clearFilter()
{
  localStorage.removeItem('filter');
  this.filterChange.emit("cartUpdate"+Date.now());
}
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);    
     });

    this.f=this.getfilter();
    if(this.f)
    {
          this.filterApi(JSON.stringify(this.f));
    }
    else if(!this.f)
    {

      let initial={"menu":{"jewelery_for":[],"jewelery_type":[],"material":[],"price":{},"purity":[],"subcategory":this.subid}};
      this.setfilter(initial);
      this.getProduct(this.subid);
    }

        this.filterChange.subscribe(data=>{
          this.f=this.getfilter();
                      if(this.f)
                    {
                          this.filterApi(JSON.stringify(this.f));
                    }
                    else if(!this.f)
                    {

                      let initial={"menu":{"jewelery_for":[],"jewelery_type":[],"material":[],"price":{},"purity":[],"subcategory":this.subid}};
                      this.setfilter(initial);
                      this.getProduct(this.subid);
                    }
          })
  }
  
}