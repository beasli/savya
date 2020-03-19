import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  drop:any;
  message:any="minimum 3 characters are required";

  searchValue= "";

  constructor(private api:ApiService ,private router:Router) {
    this.drop=this.api.drop; 
   console.log(this.drop);
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
  ngOnInit() {
    this.api.getlogin.subscribe(data => {
      this.drop=data
      console.log(data);
     });
  }

}
