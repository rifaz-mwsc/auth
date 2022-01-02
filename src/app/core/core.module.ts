import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { CoreRoutingModule } from './core-routing.module';
// Components
import { HomeComponent } from './components/home/home.component';
import { ErrorLoginTimeOutComponent } from './components/error-login-time-out/error-login-time-out.component';
import { ErrorUnauthorizedComponent } from './components/error-unauthorized/error-unauthorized.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
// sub-module
import { CoreLayoutModule } from './sub-module/core-layout/core-layout.module';
// Service
import { AuthGuard } from './services/adal-8/authentication.guard';


@NgModule({
  declarations: [
    HomeComponent,
    ErrorLoginTimeOutComponent,
    ErrorUnauthorizedComponent,
    AuthCallbackComponent,
  ],
  imports: [
    CommonModule,
    CoreLayoutModule,
    CoreRoutingModule
  ],
  exports: [
    HomeComponent,
    ErrorLoginTimeOutComponent,
    ErrorUnauthorizedComponent,
    AuthCallbackComponent
  ],
  providers: [
    AuthGuard
  ],
})
export class CoreModule { }
