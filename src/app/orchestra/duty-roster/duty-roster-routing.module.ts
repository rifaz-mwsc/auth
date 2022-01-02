import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Pages Components
import { DutyRosterHomeComponent } from './duty-roster-home/duty-roster-home.component';
import { DutyrosterHrCreateShiftComponent } from './pages/dutyroster-hr-create-shift/dutyroster-hr-create-shift.component';
import { DutyrosterHrManageShiftGroupComponent } from './pages/dutyroster-hr-manage-shift-group/dutyroster-hr-manage-shift-group/dutyroster-hr-manage-shift-group.component';
import { DutyrosterHrManageWeeklyShiftsComponent } from './pages/dutyroster-hr-manage-shift-group/dutyroster-hr-manage-weekly-shifts/dutyroster-hr-manage-weekly-shifts.component';
import { DutyrosterHrViewShiftGroupsComponent } from './pages/dutyroster-hr-manage-shift-group/dutyroster-hr-view-shift-groups/dutyroster-hr-view-shift-groups.component';
import { DutyrosterHrOffshiftSapuploadComponent } from './pages/dutyroster-hr-offshift-sapupload/dutyroster-hr-offshift-sapupload.component';
import { DutyrosterHrShiftSapuploadComponent } from './pages/dutyroster-hr-shift-sapupload/dutyroster-hr-shift-sapupload.component';
import { DutyrosterHrShiftTemplateComponent } from './pages/dutyroster-hr-shift-template/dutyroster-hr-shift-template.component';


const hrDeskRoutes: Routes = [
  { path: 'hr-dutyroster', component: DutyRosterHomeComponent },
  {
    path: 'hr-dutyroster', component: DutyRosterHomeComponent, children: [
      // { path: 'view-shift-group', component: DutyrosterHrViewShiftGroupsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'shift-group/:viewType', component: DutyrosterHrViewShiftGroupsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-shift-group/:shiftGroupId', component: DutyrosterHrManageShiftGroupComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-weekly-shift/:selectedShiftGroupId/:selectedYear', component: DutyrosterHrManageWeeklyShiftsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-shift-template', component: DutyrosterHrShiftTemplateComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'offshift-upload', component: DutyrosterHrOffshiftSapuploadComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'shift-upload', component: DutyrosterHrShiftSapuploadComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-shift/:viewType', component: DutyrosterHrViewShiftGroupsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'create-shift/:shiftGroupId', component: DutyrosterHrCreateShiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  },
  // {
  //   path: 'mwsc-common', component: HrDeskHomeComponent, canActivate: [AuthGuard], children: [
  //     { path: 'e-directory', component: MwscCommonEDirectoryComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'useful-link', component: MwscCommonUsefulLinksComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(hrDeskRoutes)],
  exports: [RouterModule]
})
export class DutyRosterRoutingModule { }
