import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OtpGuardService {
otpGuard:any;
  constructor( private router: Router,private api: ApiService) {
      this.otpGuard=this.api.getOtpGuard();
      //console.log("otp-guard"+this.otpGuard);
   }
   canActivate(route, state: RouterStateSnapshot)
  {


        if (this.otpGuard==1)
          return true;
        else{
          if(confirm('you are not authorised to access this page'))
           this.router.navigate(['/login']);
        return false;
        }
  }
}
