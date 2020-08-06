import { ApiService } from 'src/app/api/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../site/login-modal/login-modal.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {
  drop: any;
  constructor( private router: Router, private api: ApiService,private modalService: NgbModal) {
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
            let count = 1;
            const cell = this;
            setInterval(function(){ 
           //   debugger
              count ++;
              if(count==3){
                clearInterval();
                cell.modalService.open(LoginModalComponent,{ windowClass: 'myCustomModalClass2',backdrop : 'static',
                keyboard : false})
              }
            }
            , 1000);
          
           this.router.navigate(['/']);
          }
    return false;
        }
}

