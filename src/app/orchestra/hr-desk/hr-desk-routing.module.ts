import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/adal-8/authentication.guard';
// Layout Components
import { HrDeskHomeComponent } from './hr-desk-home/hr-desk-home.component';
// import { HrEmployeeProfileUpdatesComponent } from './pages/manage-employee/hr-employee-profile-updates/hr-employee-profile-updates.component';
// import { HrEmployeeProfileComponent } from './pages/manage-employee/hr-employee-profile/hr-employee-profile.component';
// Pages Components - Hr Desk
import { HrHolidaysComponent } from './pages/hr-holidays/hr-holidays.component';
import { HrLeaveRequestsComponent } from './pages/manage-leave/hr-leave-requests/hr-leave-requests.component';
import { HrLettersComponent } from './pages/hr-letters/hr-letters.component';
import { HrManageOrganizationComponent } from './pages/hr-manage-organization/hr-manage-organization.component';
import { HrOtRequestsComponent } from './pages/manage-overtime/hr-ot-requests/hr-ot-requests.component';
import { HrSapUploadLeaveComponent } from './pages/manage-leave/hr-sap-upload-leave/hr-sap-upload-leave.component';
import { HrSapUploadOtComponent } from './pages/manage-overtime/hr-sap-upload-ot/hr-sap-upload-ot.component';
import { HrEmployeeAccessControlComponent } from './pages/manage-employee/hr-employee-access-control/hr-employee-access-control.component';
import { HrEmployeeProfileUpdatesComponent } from './pages/manage-employee/hr-employee-profile-updates/hr-employee-profile-updates.component';
import { HrEmployeeProfileComponent } from './pages/manage-employee/hr-employee-profile/hr-employee-profile.component';
import { HrManageDepartmentComponent } from './pages/manage-organization/hr-manage-department/hr-manage-department.component';
import { HrManageDivisionComponent } from './pages/manage-organization/hr-manage-division/hr-manage-division.component';
import { HrManageOrganizationStructureComponent } from './pages/manage-organization/hr-manage-organization-structure/hr-manage-organization-structure.component';
import { HrManageSectionComponent } from './pages/manage-organization/hr-manage-section/hr-manage-section.component';
import { HrRemoteEmployeeComponent } from './pages/manage-organization/hr-remote-employee/hr-remote-employee.component';
import { HrEmployeeProfileDetailComponent } from './shared/components/employee-profile/hr-employee-profile-detail/hr-employee-profile-detail.component';
import { MwscCommonEDirectoryComponent } from '../mwsc-common/pages/mwsc-common-e-directory/mwsc-common-e-directory.component';
import { MwscCommonUsefulLinksComponent } from '../mwsc-common/pages/mwsc-common-useful-links/mwsc-common-useful-links.component';
import { HrDashboardComponent } from './pages/hr-dashboard/hr-dashboard.component';
import { HrEmployeeCalendarComponent } from './pages/manage-employee/hr-employee-calendar/hr-employee-calendar.component';
import { HrLeaveShortenComponent } from './pages/manage-leave/hr-leave-shorten/hr-leave-shorten.component';
import { HrAllowanceTypeComponent } from './pages/manage-allowance/hr-allowance-type/hr-allowance-type.component';
import { HrAllowanceTypeRateComponent } from './pages/manage-allowance/hr-allowance-type-rate/hr-allowance-type-rate.component';
import { HrAllowanceTypeAssignComponent } from './pages/manage-allowance/hr-allowance-type-assign/hr-allowance-type-assign.component';
import { HrAllowanceRecordsComponent } from './pages/manage-allowance/hr-allowance-records/hr-allowance-records.component';
import { HrAllowanceSalaryKeyComponent } from './pages/manage-allowance/hr-allowance-salary-key/hr-allowance-salary-key.component';
import { HrAttendanceCustomTimingComponent } from './pages/manage-attendance/hr-attendance-custom-timing/hr-attendance-custom-timing.component';
import { HrAttendanceRunComponent } from './pages/manage-attendance/hr-attendance-run/hr-attendance-run.component';
import { HrAttendanceRunDetailComponent } from './pages/manage-attendance/hr-attendance-run-detail/hr-attendance-run-detail.component';
import { HrStatisticsComponent } from './pages/manage-employee/hr-statistics/hr-statistics.component';
import { HrDashboardAuthComponent } from './pages/manage-authorization/hr-dashboard-auth/hr-dashboard-auth.component';
import { HrAbsenceRequestsComponent } from './pages/manage-attendance/hr-absence-requests/hr-absence-requests.component';
// import { HrEmployeeAccessControlComponent } from './pages/manage-employee/hr-employee-access-control/hr-employee-access-control.component';
// import { HrManageOrganizationStructureComponent } from './pages/manage-organization/hr-manage-organization-structure/hr-manage-organization-structure.component';
// import { HrRemoteEmployeeComponent } from './pages/manage-organization/hr-remote-employee/hr-remote-employee.component';
// import { HrManageOrganizationStructureComponent } from './pages/manage-organization/hr-manage-organization-structure/hr-manage-organization-structure.component';
// import { MwscCommonEDirectoryComponent } from '../mwsc-common/pages/mwsc-common-e-directory/mwsc-common-e-directory.component';
// import { MwscCommonUsefulLinksComponent } from '../mwsc-common/pages/mwsc-common-useful-links/mwsc-common-useful-links.component';
// Pages Components - Attendance
// Pages Components - Dutyroster


const hrDeskRoutes: Routes = [
  { path: 'hrDesk', component: HrDeskHomeComponent },
  // {
  //   path: 'hr', component: HumanResourcesHomeComponent, children: [
  //     { path: 'attendance-dashboard', component: GenerateDailyAttendanceComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'custom-attendance-view', component: ViewCustomTimingComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'custom-attendance-create', component: CreateCustomTimingComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //   ]
  // },
  {
    path: 'hr-desk', component: HrDeskHomeComponent, children: [
      { path: 'dashboard', component: HrDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'letters', component: HrLettersComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'holidays', component: HrHolidaysComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'statistics', component: HrStatisticsComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'leave-requests', component: HrLeaveRequestsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'leave-shorten', component: HrLeaveShortenComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'sap-upload-leave', component: HrSapUploadLeaveComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'ot-requests', component: HrOtRequestsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'sap-upload-ot', component: HrSapUploadOtComponent, canActivate: [AuthGuard], outlet: 'pages' },



      { path: 'manage-organization', component: HrManageOrganizationStructureComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-division', component: HrManageDivisionComponent, canActivate: [AuthGuard], outlet: 'pages' },
      // { path: 'hr-desk-department', component: HrManageDepartmentComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-department/:id', component: HrManageDepartmentComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-section/:id', component: HrManageSectionComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'manage-remote-employee', component: HrRemoteEmployeeComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'manage-dashboard-authorization', component: HrDashboardAuthComponent, canActivate: [AuthGuard], outlet: 'pages' },
      
      { path: 'manage-employee-profile', component: HrEmployeeProfileComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-employee-profile-updates', component: HrEmployeeProfileUpdatesComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-employee-profile-details/:id', component: HrEmployeeProfileDetailComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-employee-access-control', component: HrEmployeeAccessControlComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'calendar', component: HrEmployeeCalendarComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'manage-attendance-custom-timing', component: HrAttendanceCustomTimingComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-attendance-run', component: HrAttendanceRunComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-attendance-run-details/:Id', component: HrAttendanceRunDetailComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-attendance-absence-requests', component: HrAbsenceRequestsComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'manage-allowance-type', component: HrAllowanceTypeComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-allowance-type-rate', component: HrAllowanceTypeRateComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-allowance-type-assign', component: HrAllowanceTypeAssignComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-allowance-salary-key', component: HrAllowanceSalaryKeyComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'manage-allowance-record', component: HrAllowanceRecordsComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  },
  {
    path: 'mwsc-common', component: HrDeskHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'e-directory', component: MwscCommonEDirectoryComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'useful-link', component: MwscCommonUsefulLinksComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ],
  },
  // {
  //   path: 'hr', component: HumanResourcesHomeComponent, children: [
  //     { path: 'hr-dashboard', component: DutyrosterHrDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'hr-manage-shiftgroup', component: DutyrosterHrManageShiftGroupComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'hr-shift-template', component: DutyrosterHrShiftTemplateComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'hr-shift-sapupload', component: DutyrosterHrShiftSapuploadComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'hr-offshift-sapupload', component: DutyrosterHrOffshiftSapuploadComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //     { path: 'hr-create-shift', component: DutyrosterHrCreateShiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(hrDeskRoutes)],
  exports: [RouterModule]
})
export class HrDeskRoutingModule { }
