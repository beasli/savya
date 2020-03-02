import { ApiService } from 'src/app/api/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
  user;
  drop:any;
  constructor( private router: Router,private api: ApiService) { 
    this.drop = this.api.drop;
  }
  canActivate(route, state: RouterStateSnapshot)
  {
    this.api.getlogin.subscribe(data => {
      this.drop=data
     });

        if (this.drop==1)
          return true;
        else{
          if(confirm('Please Login to access this Page'))
           this.router.navigate(['/login']);
        return false;
        }
  }
}
