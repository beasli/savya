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
  activesearch = 0;
  catall: any;
  constructor(private api:ApiService ,private router:Router,private route:ActivatedRoute) {
    this.drop=this.api.drop; 

   router.events.subscribe((val) => {
     this.close();
   });
   
  this.api.Get(NAVIGATION).then(data => {
    this.catall = data['data'];});
  
   this.api.changelogo.subscribe(data=>{this.logochange = data
    
    if(data == 1){
      this.newurl = this.api.machineurl;
    }
  });
  }
  replacespace(value){
    value.replace(/ /g, "-")
  }
  change(value)
  {
    
    this.searchValue=value.target.value;
    //console.log(this.searchValue);
  }
  search()
  {
    console.log(this.searchValue);
    console.log(this.logochange);
    if(this.searchValue.length>3 && this.logochange != 1)
    {
        this.router.navigate(['/search',this.searchValue]);
    } else if(this.searchValue.length>3 && this.logochange == 1)
    {
      this.router.navigate(['machinery/search',this.searchValue]);
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

  searchbar() {

    if (document.getElementById('searcher').classList.contains('is-hovered')) {
      document.getElementById('searcher').classList.remove('is-hovered');
    } else {
      document.getElementById('searcher').classList.add('is-hovered');
    }
  }
  account() {

    if (document.getElementById('account').classList.contains('is-hovered')) {
      document.getElementById('account').classList.remove('is-hovered');
    } else {
      document.getElementById('account').classList.add('is-hovered');
    }
  }

  account2() {

    if (document.getElementById('account2').classList.contains('is-hovered')) {
      document.getElementById('account2').classList.remove('is-hovered');
    } else {
      document.getElementById('account2').classList.add('is-hovered');
    }
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
      
      this.drop=data;
     });
     
  }

}
