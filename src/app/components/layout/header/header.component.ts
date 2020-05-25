import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NAVIGATION, IMAGE } from 'src/config';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  drop:any;
  message:any="minimum 3 characters are required";
  baseurl = IMAGE;
  searchValue= "";
  logochange: any;
  newurl: string;
  activ = 0;
  catall: any;
  constructor(private api:ApiService ,private router:Router,private route:ActivatedRoute) {
    this.drop=this.api.drop; 
   console.log(this.drop);

   router.events.subscribe((val) => {
     this.close();
     if(this.drop==1)
        {
          console.log('I am in')
         this.api.updateCart();
        }
   });
   
  this.api.Get(NAVIGATION).then(data => {
    this.catall = data['data'];});
  
   this.api.changelogo.subscribe(data=>{this.logochange = data
    console.log(this.logochange);
    if(data == 1){
      this.newurl = this.router.url;
    }
  });
  }
  change(value)
  {
    
    this.searchValue=value.target.value;
    //console.log(this.searchValue);
  }
  search()
  {
    console.log(this.searchValue);
    if(this.searchValue.length>3)
    {
        this.router.navigate(['/search',this.searchValue]);
    }
  }
  popularSearch(value)
  {
    console.log("in search");
    this.router.navigate(['/search',value]);
  }
  alert()
  {
    if(this.searchValue.length>3)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  logout()
  {
   
    this.api.setlogin(0);
    this.api.logout();
    this.router.navigate(['/home']);
  }
  mobile(){
    console.log(this.activ);
    if(this.activ==0){
      this.activ = 1;
    } else{
      this.activ = 0;
    }
  }

  close(){
    this.activ = 0;
    
    document.getElementById('close').click();
  }

  ProductsInCart()
{
  let cart=this.api.getCart();
  if(cart)
  {
    return (cart.length);
  }
  else
  {
    return (0);
  }
}
  ngOnInit() {
    this.api.getlogin.subscribe(data => {
      console.log(+data);
      this.drop=data;
      console.log(this.drop);
     });
     
  }

}
