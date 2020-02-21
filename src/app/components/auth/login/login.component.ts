import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { LOGIN } from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,private router:Router) { }
d:any;
  login(value)
  {
      console.log(value);
      this.api.Post(LOGIN,value).then(data=>{
      this.d=data['data'][0];
         console.log(this.d);
         if(data['data'])
         {
            this.router.navigate(['/home']);
            localStorage.setItem('data',JSON.stringify(this.d));   
         }

        });

  }

  ngOnInit() {
  }

}
