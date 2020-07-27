import { ModalComponent } from './../layout/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { PROFILEVIEW } from 'src/config';
import { Router, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class KycguardService {

  constructor(private api:ApiService,private router:Router,private modalService: NgbModal) { }
  canActivate(route, state: RouterStateSnapshot) {
    return new Promise(res => {
      this.api.Post(PROFILEVIEW, {}).then(data=>{
        let kyc=data['kyc'];
        if(kyc!=null && kyc.document_verified==2)
        {
          res(true);
        }
        else {
          this.modalService.open(ModalComponent, { size: 'xl',windowClass: 'myCustomModalClass'});
          res(false);
        }
        
  }).catch(d=>{
    if(d.status == 401){
      this.api.onFail('Please Login to See Product details');
      this.api.setGoto();
      this.api.setlogin(0);
      this.api.logout();
      setTimeout(() => {
      this.router.navigate(['/']);
      },1000);
    } else{
      console.log(d);
    }
  });
    });

        
   }
}
