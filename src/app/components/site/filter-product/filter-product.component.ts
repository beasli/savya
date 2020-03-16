import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { SUBCATEGORYTYPE, PRODUCTLIST } from 'src/config';

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
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.subid = params.id;
      this.getsubsub();
    //  console.log(params);
      });
  }
  getsubsub() {
    this.api.Post(SUBCATEGORYTYPE, {subcategory_id: this.subid } ).then(data  => {
      this.data = data['data'];

      console.log(data);
     }).catch(d=>{
      console.log(d);
    });
  }
  getProduct(value)
  {
    this.api.Post(PRODUCTLIST, {subsubcategory_id: value } ).then(data  => {
  
      this.products = data['data'];
      console.log(this.products);
      this.url = data['url'] + '/';
      console.log(this.url);
       }).catch(d=>{
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
     this.api.checkWishlist(pid);
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
  ngOnInit() {
  }

}
