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
            console.log(d);
      });
  }
}
