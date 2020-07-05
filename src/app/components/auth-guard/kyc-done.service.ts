import { Injectable } from '@angular/core';
import { PROFILEVIEW } from 'src/config';
import { ApiService } from 'src/app/api/api.service';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KycDoneService {

  constructor(private api:ApiService,private route:Router) { }
  canActivate(route, state: RouterStateSnapshot) {
          this.api.Post(PROFILEVIEW, {}).then(data=>{
            let kyc=data['kyc'];
            if(kyc==null || kyc.document_verified != 2)
            {
              
              return true
            }
            else{
              this.api.onFail('Your account is already verified');
              return false;
            }
      }).catch(d=>{
        if(d.error.message == 'Unauthenticated.' && d.status == 401){
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
