import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Pages Components (mwsc-common)
import { MwscCommonEDirectoryComponent } from './pages/mwsc-common-e-directory/mwsc-common-e-directory.component';


const mwscCommonRoutes: Routes = [
  {
    path: 'mwsc-common', component: MwscCommonEDirectoryComponent, canActivate: [AuthGuard], children: [
      { path: 'e-directory', component: MwscCommonEDirectoryComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mwscCommonRoutes)],
  exports: [RouterModule]
})
export class MwscCommonRoutingModule { }
