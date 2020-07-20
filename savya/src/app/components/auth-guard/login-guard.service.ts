import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  drop: any;
  constructor(private router: Router, private api: ApiService) {
    this.drop=this.api.drop;
   }
  canActivate(route, state: RouterStateSnapshot) {
    this.api.getlogin.subscribe(data => {
      this.drop = data;
      console.log("login service");
    });
    
    if (this.drop == 0 ) {
      console.log("login service if condition");
      console.log(this.drop);
      return true;
     } else if(this.drop==1){
      console.log("login service else if condition");
      console.log(this.drop);
       this.api.onSuccess('You have already Login ');
       this.router.navigate(['home']);
       return false;
      }
      
    }
}
