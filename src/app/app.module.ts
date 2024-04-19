import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReducer} from './core/Stores/Users/User.Reducer';
import { userEffects } from './core/Stores/Users/User.Effects';
import { AppEffects } from './core/Stores/Common/App.Effects';

import { provideNativeDateAdapter } from '@angular/material/core';
import { ProductlistingComponent } from './component/products/productlisting/productlisting.component';
import { AddproductComponent } from './component/products/addproduct/addproduct.component';
import { AdduserComponent } from './component/users/adduser/adduser.component';
import { UserlistingComponent } from './component/users/userlisting/userlisting.component';
import { ProductReducer } from './core/Stores/Products/Product.Reducer';
import { productEffects } from './core/Stores/Products/Product.Effects';
import { LoginComponent } from './component/login/login/login.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MenubarComponent } from './component/menubar/menubar.component';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './core/header/header.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { CustomerEffects } from './core/Stores/Customers/Customer.Effects';
import { customerReducer } from './core/Stores/Customers/Customer.Reducer';
import { AcknowledgementComponent } from './component/acknowledgement/acknowledgement.component';
import { ShopsComponent } from './component/shops/shops.component';
import { AddOrderComponent } from './component/shops/pages/add-order/add-order.component';
import { CartListComponent } from './component/cart/cart-list/cart-list.component';
import { CheckoutComponent } from './component/cart/checkout/checkout.component';
import { CartReducer } from './core/Stores/Cart/Cart.Reducer';
import { CartEffects } from './core/Stores/Cart/Cart.Effect';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    UserlistingComponent,
    ProductlistingComponent,
    AddproductComponent,
    LoginComponent,
    MenubarComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    AcknowledgementComponent,
    ShopsComponent,
    AddOrderComponent,
    CartListComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({users:UserReducer, products: ProductReducer,  customers: customerReducer, cart: CartReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    EffectsModule.forRoot([userEffects,AppEffects, productEffects, CustomerEffects,CartEffects]),
    NgxMaskDirective,NgxMaskPipe, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),
  //   ServiceWorkerModule.register('ngsw-worker.js', {
  // enabled: !isDevMode(),
  // // Register the ServiceWorker as soon as the application is stable
  // // or after 30 seconds (whichever comes first).
  // registrationStrategy: 'registerWhenStable:30000'
// }),
  ],
  providers: [
    provideNgxMask(),
    provideHttpClient(withFetch()),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
