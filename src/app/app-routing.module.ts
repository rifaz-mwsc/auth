import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './core/services/adal-8/authentication.guard';
// CoreModule - Componets
// import { HomeComponent } from './core/components/home/home.component';
import { ErrorLoginTimeOutComponent } from './core/components/error-login-time-out/error-login-time-out.component';
import { ErrorUnauthorizedComponent } from './core/components/error-unauthorized/error-unauthorized.component';
import { AuthCallbackComponent } from './core/components/auth-callback/auth-callback.component';
// OrchestraModule - Componets
import { HrDeskHomeComponent } from './orchestra/hr-desk/hr-desk-home/hr-desk-home.component';
import { DutyRosterHomeComponent } from './orchestra/duty-roster/duty-roster-home/duty-roster-home.component';


// export const mainRoutes: Routes = [
const mainRoutes: Routes = [
  { path: '', component: HrDeskHomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HrDeskHomeComponent, canActivate: [AuthGuard] },
  { path: 'hr', component: HrDeskHomeComponent, canActivate: [AuthGuard] },
  { path: 'hr-dutyroster', component: DutyRosterHomeComponent, canActivate: [AuthGuard] },
  // { path: 'lms', component: LabManagementSystemHomeComponent, canActivate: [AuthGuard] },
  // { path: 'nfc-guard-patrol', component: NfcGuardPatrolHomeComponent, canActivate: [AuthGuard] },
  // { path: 'staff-portal', component: StaffPortalHomeComponent },
  { path: 'error-login-time-out', component: ErrorLoginTimeOutComponent },
  { path: 'error-unauthorized', component: ErrorUnauthorizedComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  // { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes)
    // RouterModule.forRoot(mainRoutes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
