import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SEARCH } from 'src/config';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
data:any;
products:any;
url:any;
wish:any;
alert:boolean;
div:boolean;
loader:boolean;
page:boolean;
message:any="Nothing To Show";
drop:any;
@ViewChild('addclosebutton') addclosebutton;
@ViewChild('deleteclosebutton') deleteclosebutton;
  constructor(private api:ApiService,private route:ActivatedRoute,private router:Router) { 
    this.drop=this.api.drop; 
    this.route.params.subscribe(params => {
      console.log(params.value);
      this.data=params.value;
      this.searchApi();
      });
  }
searchApi()
{
  this.loader=true;
    this.page=false;
  this.api.Post(SEARCH,{name:this.data}).then(data=>{
    this.page=true;
      this.loader=false;
    this.alert=false;
    this.div=true;
    console.log(data);
    this.products = data['data'];
    console.log(this.products);
    this.url = data['url'] + '/';
  }).catch(d=>{
    this.page=true;
      this.loader=false;
    this.alert=true;
    this.div=false;
    console.log(d); 
  })
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
        else
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
addmodal() {
  this.addclosebutton.nativeElement.click();
}
deletemodal()
{
  this.deleteclosebutton.nativeElement.click();
}
  ngOnInit() {
    this.loader=true;
    this.page=false;
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);    
     });

  }

}
