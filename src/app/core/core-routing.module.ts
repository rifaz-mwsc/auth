import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component
import { HomeComponent } from './components/home/home.component';
import { ErrorLoginTimeOutComponent } from './components/error-login-time-out/error-login-time-out.component';
import { ErrorUnauthorizedComponent } from './components/error-unauthorized/error-unauthorized.component';
// Auth Guard
import { AuthGuard } from './services/adal-8/authentication.guard';

const coreRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'error-login-time-out', component: ErrorLoginTimeOutComponent},
  { path: 'error-unauthorized', component: ErrorUnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
