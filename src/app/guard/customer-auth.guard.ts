import { inject } from '@angular/core';
import { CustomerService } from '../core/services/customer.service';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const customerAuthGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state) => {
  const service = inject(CustomerService);
  const router = inject(Router);
  const customerData = service.getCustomerFromLocalStorage();

  if (!customerData || !customerData.role) {
    console.log('back to login')
     router.navigate(['/login']);
    return false;
  }
  const requiredRole = route.data['role'];
    if (customerData.role === requiredRole) {
      console.log('to dashboard')
      return true; 
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }

};
