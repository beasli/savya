import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEVIEW } from 'src/config';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KycguardService {

  constructor(private api:ApiService,private route:Router) { }
  canActivate(route, state: RouterStateSnapshot) {
          this.api.Post(PROFILEVIEW, {}).then(data=>{
            let kyc=data['kyc'];
            if(kyc==null)
            {
        
              this.api.onFail('Your account is not verified');
              return false;
              
            }
            else{
              return true;
            }
            console.log("guard api");
          
      }).catch(d=>{
        if(d.status == 401 || d.status == 503){
          this.api.onFail('Your session is expired please login again');
          this.api.setGoto();
          this.api.setlogin(0);
          this.api.logout();
          setTimeout(() => {
          this.route.navigate(['/login']);
          },1000);
        } else{
          console.log(d);
        }
      });
  }
}
