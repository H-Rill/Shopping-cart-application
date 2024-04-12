import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistingComponent } from './component/users/userlisting/userlisting.component';
import { ProductlistingComponent } from './component/products/productlisting/productlisting.component';
import { LoginComponent } from './component/login/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AcknowledgementComponent } from './component/acknowledgement/acknowledgement.component';
import { ShopsComponent } from './component/shops/shops.component';
import { CartListComponent } from './component/cart/cart-list/cart-list.component';
import { CheckoutComponent } from './component/cart/checkout/checkout.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[authGuard]},
  {path: 'users', component: UserlistingComponent, canActivate:[authGuard]},
  {path: 'products', component: ProductlistingComponent, canActivate:[authGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'forgotpassword/acknowledge', component: AcknowledgementComponent},
  {path: 'shops', component: ShopsComponent, canActivate:[authGuard]},
  { path: 'cart', component: CartListComponent, canActivate:[authGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate:[authGuard]}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
