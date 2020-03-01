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
  constructor(private api:ApiService ,private router:Router) {
    this.drop=this.api.drop; 
   console.log(this.drop);
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
     });
  }

}
