import { ApiService } from 'src/app/api/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
  drop: any;
  constructor( private router: Router, private api: ApiService) {
    this.drop = this.api.drop;
  }
  canActivate(route, state: RouterStateSnapshot) {
    this.api.getlogin.subscribe(data => {
      this.drop = data;
    });

    if (this.drop == 1 ) {
          return true;
         } else {
           this.api.onSuccess('You have to Login to Proceed');
           this.api.setGoto();
           console.log(this.api.goto);

           this.router.navigate(['/']);
          }
    return false;
        }
}

