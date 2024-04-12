import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

export const authGuard: CanActivateFn = (route , state) => {
  const service = inject(UserService)
  const router = inject(Router)
  const userInfo  = service.getuserdatafromstorage();
  if(userInfo.username !='' && userInfo.username!=null){
    
    return true;
  } else{
    router.navigate(['login'])
    return false;
  }

};
