import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Plugins
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FullCalendarModule } from '@fullcalendar/angular';           // for FullCalendar!
import { QrCodeModule } from 'ng-qrcode';
// Routing
import { HrDeskRoutingModule } from './hr-desk-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Layout
import { HrDeskHomeComponent } from './hr-desk-home/hr-desk-home.component';
// Page Components
import { HrLettersComponent } from './pages/hr-letters/hr-letters.component';
import { HrHolidaysComponent } from './pages/hr-holidays/hr-holidays.component';
import { HrOtRequestsComponent } from './pages/manage-overtime/hr-ot-requests/hr-ot-requests.component';
import { HrSapUploadOtComponent } from './pages/manage-overtime/hr-sap-upload-ot/hr-sap-upload-ot.component';
// Shared Components - Letters
import { HrLettersViewCardComponent } from './shared/components/letters/hr-letters-view-card/hr-letters-view-card.component';
import { HrLettersViewListComponent } from './shared/components/letters/hr-letters-view-list/hr-letters-view-list.component';
import { HrLettersViewTableComponent } from './shared/components/letters/hr-letters-view-table/hr-letters-view-table.component';
import { HrLettersUploadBulkModelComponent } from './shared/components/letters/hr-letters-upload-bulk-model/hr-letters-upload-bulk-model.component';
import { HrLettersDetailViewModelComponent } from './shared/components/letters/hr-letters-detail-view-model/hr-letters-detail-view-model.component';
// Shared Components - Holidays
import { HrHolidaysViewCardComponent } from './shared/components/holidays/hr-holidays-view-card/hr-holidays-view-card.component';
import { HrHolidaysViewListComponent } from './shared/components/holidays/hr-holidays-view-list/hr-holidays-view-list.component';
import { HrHolidaysViewTableComponent } from './shared/components/holidays/hr-holidays-view-table/hr-holidays-view-table.component';
import { HrHolidaysDetailViewModelComponent } from './shared/components/holidays/hr-holidays-detail-view-model/hr-holidays-detail-view-model.component';
// Shared Components - Overtime
import { HrOtRequestsViewCardComponent } from './shared/components/ot-requests/hr-ot-requests-view-card/hr-ot-requests-view-card.component';
import { HrOtRequestsViewListComponent } from './shared/components/ot-requests/hr-ot-requests-view-list/hr-ot-requests-view-list.component';
import { HrOtRequestsViewTableComponent } from './shared/components/ot-requests/hr-ot-requests-view-table/hr-ot-requests-view-table.component';
import { HrUploadOtViewTableComponent } from './shared/components/upload-ot/hr-upload-ot-view-table/hr-upload-ot-view-table.component';
import { HrExtendOtComponent } from './shared/components/extend-ot/hr-extend-ot/hr-extend-ot.component';
import { HrExtendOtViewCardComponent } from './shared/components/extend-ot/hr-extend-ot-view-card/hr-extend-ot-view-card.component';
import { HrExtendOtViewListComponent } from './shared/components/extend-ot/hr-extend-ot-view-list/hr-extend-ot-view-list.component';
import { HrExtendOtViewTableComponent } from './shared/components/extend-ot/hr-extend-ot-view-table/hr-extend-ot-view-table.component';
import { HrOtRequestsExtendBulkModelComponent } from './shared/components/ot-requests/hr-ot-requests-extend-bulk-model/hr-ot-requests-extend-bulk-model.component';
import { HrOtRequestsDetailViewModelComponent } from './shared/components/ot-requests/hr-ot-requests-detail-view-model/hr-ot-requests-detail-view-model.component';
import { HrUploadOtUploadBulkModelComponent } from './shared/components/upload-ot/hr-upload-ot-upload-bulk-model/hr-upload-ot-upload-bulk-model.component';
// Shared Components - Leave
import { HrLeaveRequestsComponent } from './pages/manage-leave/hr-leave-requests/hr-leave-requests.component';
import { HrSapUploadLeaveComponent } from './pages/manage-leave/hr-sap-upload-leave/hr-sap-upload-leave.component'
import { HrUploadLeaveViewTableComponent } from './shared/components/upload-leave/hr-upload-leave-view-table/hr-upload-leave-view-table.component';
import { HrLeaveRequestsViewCardComponent } from './shared/components/leave-requests/hr-leave-requests-view-card/hr-leave-requests-view-card.component';
import { HrLeaveRequestsViewListComponent } from './shared/components/leave-requests/hr-leave-requests-view-list/hr-leave-requests-view-list.component';
import { HrLeaveRequestsViewTableComponent } from './shared/components/leave-requests/hr-leave-requests-view-table/hr-leave-requests-view-table.component';
import { HrExtendLeaveComponent } from './shared/components/extend-leave/hr-extend-leave/hr-extend-leave.component';
import { HrExtendLeaveViewCardComponent } from './shared/components/extend-leave/hr-extend-leave-view-card/hr-extend-leave-view-card.component';
import { HrExtendLeaveViewListComponent } from './shared/components/extend-leave/hr-extend-leave-view-list/hr-extend-leave-view-list.component';
import { HrExtendLeaveViewTableComponent } from './shared/components/extend-leave/hr-extend-leave-view-table/hr-extend-leave-view-table.component';
import { HrLeaveRequestsDetailViewModelComponent } from './shared/components/leave-requests/hr-leave-requests-detail-view-model/hr-leave-requests-detail-view-model.component';
import { HrLeaveRequestsExtendBulkModelComponent } from './shared/components/leave-requests/hr-leave-requests-extend-bulk-model/hr-leave-requests-extend-bulk-model.component';
import { HrLeaveRequestsExtendModelComponent } from './shared/components/leave-requests/hr-leave-requests-extend-model/hr-leave-requests-extend-model.component';
import { HrLeaveRequestsSapUploadModelComponent } from './shared/components/leave-requests/hr-leave-requests-sap-upload-model/hr-leave-requests-sap-upload-model.component';
import { HrUploadLeaveUploadBulkModelComponent } from './shared/components/upload-leave/hr-upload-leave-upload-bulk-model/hr-upload-leave-upload-bulk-model.component';
// Shared Components - Manage Organisation
import { HrManageOrganizationComponent } from './pages/hr-manage-organization/hr-manage-organization.component';
import { HrManageDivisionComponent } from './pages/manage-organization/hr-manage-division/hr-manage-division.component';
import { HrManageDepartmentComponent } from './pages/manage-organization/hr-manage-department/hr-manage-department.component';
import { HrManageSectionComponent } from './pages/manage-organization/hr-manage-section/hr-manage-section.component';
import { DivisionViewCardComponent } from './shared/components/organization/division-view-card/division-view-card.component';
import { DivisionViewListComponent } from './shared/components/organization/division-view-list/division-view-list.component';
import { DivisionViewTableComponent } from './shared/components/organization/division-view-table/division-view-table.component';
import { DepartmentViewCardComponent } from './shared/components/organization/department-view-card/department-view-card.component';
import { DepartmentViewListComponent } from './shared/components/organization/department-view-list/department-view-list.component';
import { DepartmentViewTableComponent } from './shared/components/organization/department-view-table/department-view-table.component';
import { SectionViewCardComponent } from './shared/components/organization/section-view-card/section-view-card.component';
import { SectionViewListComponent } from './shared/components/organization/section-view-list/section-view-list.component';
import { SectionViewTableComponent } from './shared/components/organization/section-view-table/section-view-table.component';
// Shared Components - Remote Employee
import { HrRemoteEmployeeComponent } from './pages/manage-organization/hr-remote-employee/hr-remote-employee.component';
import { HrRemoteEmployeeViewCardComponent } from './shared/components/remote-employee/hr-remote-employee-view-card/hr-remote-employee-view-card.component';
import { HrRemoteEmployeeViewListComponent } from './shared/components/remote-employee/hr-remote-employee-view-list/hr-remote-employee-view-list.component';
import { HrRemoteEmployeeViewTableComponent } from './shared/components/remote-employee/hr-remote-employee-view-table/hr-remote-employee-view-table.component';
import { HrRemoteEmployeeDetailViewModelComponent } from './shared/components/remote-employee/hr-remote-employee-detail-view-model/hr-remote-employee-detail-view-model.component';
// Shared Components - Employee Profile
import { HrEmployeeProfileComponent } from './pages/manage-employee/hr-employee-profile/hr-employee-profile.component';
import { HrEmployeeProfileViewCardComponent } from './shared/components/employee-profile/hr-employee-profile-view-card/hr-employee-profile-view-card.component';
import { HrEmployeeProfileViewListComponent } from './shared/components/employee-profile/hr-employee-profile-view-list/hr-employee-profile-view-list.component';
import { HrEmployeeProfileViewTableComponent } from './shared/components/employee-profile/hr-employee-profile-view-table/hr-employee-profile-view-table.component';
import { HrEmployeeProfileDetailViewModelComponent } from './shared/components/employee-profile/hr-employee-profile-detail-view-model/hr-employee-profile-detail-view-model.component';
import { HrEmployeeProfileDetailComponent } from './shared/components/employee-profile/hr-employee-profile-detail/hr-employee-profile-detail.component';
import { HrEmployeeProfileBasicInfoComponent } from './shared/components/employee-profile/hr-employee-profile-basic-info/hr-employee-profile-basic-info.component';
// import { HrEmployeeProfileContactInfoComponent } from './shared/components/employee-profile/hr-employee-profile-contact-info/hr-employee-profile-contact-info.component';
import { HrEmployeeProfileAddressInfoComponent } from './shared/components/employee-profile/hr-employee-profile-address-info/hr-employee-profile-address-info.component';
// Shared Components - Employee Profile Updates
import { HrEmployeeProfileUpdatesComponent } from './pages/manage-employee/hr-employee-profile-updates/hr-employee-profile-updates.component';
import { EmployeeProfileUpdatesViewCardComponent } from './shared/components/employee-profile-updates/employee-profile-updates-view-card/employee-profile-updates-view-card.component';
import { EmployeeProfileUpdatesViewListComponent } from './shared/components/employee-profile-updates/employee-profile-updates-view-list/employee-profile-updates-view-list.component';
import { EmployeeProfileUpdatesViewTableComponent } from './shared/components/employee-profile-updates/employee-profile-updates-view-table/employee-profile-updates-view-table.component';
import { EmployeeProfileUpdatesDetailViewModelComponent } from './shared/components/employee-profile-updates/employee-profile-updates-detail-view-model/employee-profile-updates-detail-view-model.component';
import { HrEmployeeProfileAccessControlComponent } from './shared/components/employee-profile/hr-employee-profile-access-control/hr-employee-profile-access-control.component';
// import { HrEmployeeProfileEducationTrainingComponent } from './shared/components/employee-profile/hr-employee-profile-education-training/hr-employee-profile-education-training.component';
import { HrEmployeeProfileFamilyComponent } from './shared/components/employee-profile/hr-employee-profile-family/hr-employee-profile-family.component';
import { HrEmployeeProfileEducationComponent } from './shared/components/employee-profile/hr-employee-profile-education/hr-employee-profile-education.component';
import { HrEmployeeProfileSkillsComponent } from './shared/components/employee-profile/hr-employee-profile-skills/hr-employee-profile-skills.component';
import { HrEmployeeProfileExperienceComponent } from './shared/components/employee-profile/hr-employee-profile-experience/hr-employee-profile-experience.component';
import { HrEmployeeAccessControlComponent } from './pages/manage-employee/hr-employee-access-control/hr-employee-access-control.component';
import { EmployeeAccessControlViewCardComponent } from './shared/components/employee-access-control/employee-access-control-view-card/employee-access-control-view-card.component';
import { EmployeeAccessControlViewListComponent } from './shared/components/employee-access-control/employee-access-control-view-list/employee-access-control-view-list.component';
import { EmployeeAccessControlViewTableComponent } from './shared/components/employee-access-control/employee-access-control-view-table/employee-access-control-view-table.component';
// import { HrManageOrganizationStructureComponent } from './pages/manage-organization/hr-manage-organization-structure/hr-manage-organization-structure.component';
import { HrLettersDetailsCommonViewComponent } from './shared/components/letters/hr-letters-details-common-view/hr-letters-details-common-view.component';
import { HrManageOrganizationStructureComponent } from './pages/manage-organization/hr-manage-organization-structure/hr-manage-organization-structure.component';
import { HrDashboardComponent } from './pages/hr-dashboard/hr-dashboard.component';
import { HrEmployeeCalendarComponent } from './pages/manage-employee/hr-employee-calendar/hr-employee-calendar.component';
import { HrUploadLeaveRejectComponent } from './shared/components/upload-leave/hr-upload-leave-reject/hr-upload-leave-reject.component';
import { HrUploadOtRejectComponent } from './shared/components/upload-ot/hr-upload-ot-reject/hr-upload-ot-reject.component';
import { HrLeaveShortenComponent } from './pages/manage-leave/hr-leave-shorten/hr-leave-shorten.component';
import { HrLeaveRequestsShotenModelComponent } from './shared/components/leave-requests/hr-leave-requests-shoten-model/hr-leave-requests-shoten-model.component';
import { HrUploadLeaveDetailViewModelComponent } from './shared/components/upload-leave/hr-upload-leave-detail-view-model/hr-upload-leave-detail-view-model.component';
import { HrUploadOtDetailViewModelComponent } from './shared/components/upload-ot/hr-upload-ot-detail-view-model/hr-upload-ot-detail-view-model.component';
import { HrOtRequestsShotenModelComponent } from './shared/components/ot-requests/hr-ot-requests-shoten-model/hr-ot-requests-shoten-model.component';

// Manage Allowance
import { HrAllowanceTypeComponent } from './pages/manage-allowance/hr-allowance-type/hr-allowance-type.component';
import { HrAllowanceTypeRateComponent } from './pages/manage-allowance/hr-allowance-type-rate/hr-allowance-type-rate.component';
import { HrAllowanceTypeAssignComponent } from './pages/manage-allowance/hr-allowance-type-assign/hr-allowance-type-assign.component';
import { HrAllowanceRecordsComponent } from './pages/manage-allowance/hr-allowance-records/hr-allowance-records.component';
import { HrAllowanceTypeViewComponent } from './shared/components/allowance-type/hr-allowance-type-view/hr-allowance-type-view.component';
import { HrAllowanceTypeRateViewComponent } from './shared/components/allowance-type-rate/hr-allowance-type-rate-view/hr-allowance-type-rate-view.component';
import { HrAllowanceTypeAssignViewComponent } from './shared/components/allowance-type-assign/hr-allowance-type-assign-view/hr-allowance-type-assign-view.component';
import { HrAllowanceRecordsViewComponent } from './shared/components/allowance-records/hr-allowance-records-view/hr-allowance-records-view.component';
import { HrAllowanceTypeCreateComponent } from './shared/components/allowance-type/hr-allowance-type-create/hr-allowance-type-create.component';
import { HrAllowanceTypeAssignCreateComponent } from './shared/components/allowance-type-assign/hr-allowance-type-assign-create/hr-allowance-type-assign-create.component';
import { HrAllowanceTypeRateCreateComponent } from './shared/components/allowance-type-rate/hr-allowance-type-rate-create/hr-allowance-type-rate-create.component';
import { HrAllowanceTypeDeleteComponent } from './shared/components/allowance-type/hr-allowance-type-delete/hr-allowance-type-delete.component';
import { HrAllowanceTypeAssignDeleteComponent } from './shared/components/allowance-type-assign/hr-allowance-type-assign-delete/hr-allowance-type-assign-delete.component';
import { HrAllowanceTypeRateDeleteComponent } from './shared/components/allowance-type-rate/hr-allowance-type-rate-delete/hr-allowance-type-rate-delete.component';
import { HrAllowanceTypeCommonViewComponent } from './shared/components/allowance-type/hr-allowance-type-common-view/hr-allowance-type-common-view.component';
import { HrAllowanceTypeAssignCommonViewComponent } from './shared/components/allowance-type-assign/hr-allowance-type-assign-common-view/hr-allowance-type-assign-common-view.component';
import { HrAllowanceTypeRateCommonViewComponent } from './shared/components/allowance-type-rate/hr-allowance-type-rate-common-view/hr-allowance-type-rate-common-view.component';
import { HrAllowanceTypeAssignToEmployeeComponent } from './shared/components/allowance-type-assign/hr-allowance-type-assign-to-employee/hr-allowance-type-assign-to-employee.component';
import { HrAllowanceSalaryKeyComponent } from './pages/manage-allowance/hr-allowance-salary-key/hr-allowance-salary-key.component';
import { HrAllowanceSalaryKeyCommonViewComponent } from './shared/components/allowance-salary-key/hr-allowance-salary-key-common-view/hr-allowance-salary-key-common-view.component';
import { HrAllowanceSalaryKeyCreateComponent } from './shared/components/allowance-salary-key/hr-allowance-salary-key-create/hr-allowance-salary-key-create.component';
import { HrAllowanceSalaryKeyDeleteComponent } from './shared/components/allowance-salary-key/hr-allowance-salary-key-delete/hr-allowance-salary-key-delete.component';
import { HrAllowanceSalaryKeyViewComponent } from './shared/components/allowance-salary-key/hr-allowance-salary-key-view/hr-allowance-salary-key-view.component';
import { HrAttendanceCustomTimingComponent } from './pages/manage-attendance/hr-attendance-custom-timing/hr-attendance-custom-timing.component';
import { HrAttendanceCustomTimingViewComponent } from './shared/components/attendance-custom-timing/hr-attendance-custom-timing-view/hr-attendance-custom-timing-view.component';
import { HrAttendanceCustomTimingCreateComponent } from './shared/components/attendance-custom-timing/hr-attendance-custom-timing-create/hr-attendance-custom-timing-create.component';
import { HrAttendanceCustomTimingDeleteComponent } from './shared/components/attendance-custom-timing/hr-attendance-custom-timing-delete/hr-attendance-custom-timing-delete.component';
import { HrAttendanceCustomTimingCommonViewComponent } from './shared/components/attendance-custom-timing/hr-attendance-custom-timing-common-view/hr-attendance-custom-timing-common-view.component';
import { HrAttendanceRunCommonViewComponent } from './shared/components/attendance-run/hr-attendance-run-common-view/hr-attendance-run-common-view.component';
import { HrAttendanceRunViewComponent } from './shared/components/attendance-run/hr-attendance-run-view/hr-attendance-run-view.component';
import { HrAttendanceRunComponent } from './pages/manage-attendance/hr-attendance-run/hr-attendance-run.component';
import { HrAttendanceManualRunCreateComponent } from './shared/components/attendance-run/hr-attendance-manual-run-create/hr-attendance-manual-run-create.component';
import { HrAttendanceRerunComponent } from './shared/components/attendance-run/hr-attendance-rerun/hr-attendance-rerun.component';
import { HrAttendanceRunDetailViewComponent } from './shared/components/attendance-run/hr-attendance-run-detail-view/hr-attendance-run-detail-view.component';
import { HrAttendanceRunFullDetailViewComponent } from './shared/components/attendance-run-detail/hr-attendance-run-full-detail-view/hr-attendance-run-full-detail-view.component';
import { HrAttendanceRunDetailComponent } from './pages/manage-attendance/hr-attendance-run-detail/hr-attendance-run-detail.component';
import { HrStatisticsComponent } from './pages/manage-employee/hr-statistics/hr-statistics.component';
import { HrDashboardAuthComponent } from './pages/manage-authorization/hr-dashboard-auth/hr-dashboard-auth.component';
import { HrAuthDashboardViewComponent } from './shared/components/auth-dashboard/hr-auth-dashboard-view/hr-auth-dashboard-view.component';
import { HrAuthDashboardRemoveComponent } from './shared/components/auth-dashboard/hr-auth-dashboard-remove/hr-auth-dashboard-remove.component';
import { HrAuthDashboardDetailsCommonViewComponent } from './shared/components/auth-dashboard/hr-auth-dashboard-details-common-view/hr-auth-dashboard-details-common-view.component';
import { HrAuthDashboardSetAsDefaultComponent } from './shared/components/auth-dashboard/hr-auth-dashboard-set-as-default/hr-auth-dashboard-set-as-default.component';
import { HrAuthDashboardSetExpiryComponent } from './shared/components/auth-dashboard/hr-auth-dashboard-set-expiry/hr-auth-dashboard-set-expiry.component';
import { HrAttendanceAbsenceService } from './shared/services/manage-attendance/hr-attendance-absence.service';
import { HrAttendanceAbsenceViewComponent } from './shared/components/attendance-absence/hr-attendance-absence-view/hr-attendance-absence-view.component';
import { HrAbsenceRequestsComponent } from './pages/manage-attendance/hr-absence-requests/hr-absence-requests.component';


@NgModule({
  declarations: [
    HrDeskHomeComponent,
    HrDashboardComponent,                               // Pages-Component

    HrLettersComponent,                                 // Pages-Component
    HrLettersViewCardComponent,                         // Shared-Component
    HrLettersViewListComponent,                         // Shared-Component
    HrLettersViewTableComponent,                        // Shared-Component
    HrLettersUploadBulkModelComponent,                  // Shared-Component
    HrLettersDetailViewModelComponent,                  // Shared-Component
    HrLettersDetailsCommonViewComponent,                // Shared-Component

    HrHolidaysComponent,                                // Pages-Component
    HrHolidaysViewCardComponent,                        // Shared-Component
    HrHolidaysViewListComponent,                        // Shared-Component
    HrHolidaysViewTableComponent,                       // Shared-Component
    HrHolidaysDetailViewModelComponent,                 // Shared-Component

    HrStatisticsComponent,                              // Pages-Component - General

    HrLeaveRequestsComponent,                           // Pages-Component - Manage Leave
    HrLeaveShortenComponent,                            // Pages-Component - Manage Leave
    HrSapUploadLeaveComponent,                          // Pages-Component - Manage Leave

    HrOtRequestsComponent,                              // Pages-Component - Manage Overtime
    HrSapUploadOtComponent,                             // Pages-Component - Manage Overtime

    HrRemoteEmployeeComponent,                          // Pages-Component
    HrEmployeeProfileComponent,                         // Pages-Component
    HrEmployeeProfileUpdatesComponent,                  // Pages-Component
    HrEmployeeProfileComponent,                         // Pages-Component
    HrEmployeeAccessControlComponent,                   // Pages-Component
    HrRemoteEmployeeComponent,                          // Pages-Component
    HrManageOrganizationComponent,                      // Pages-Component
    HrManageDivisionComponent,                          // Pages-Component
    HrManageDepartmentComponent,                        // Pages-Component
    HrManageSectionComponent,                           // Pages-Component
    HrManageOrganizationStructureComponent,             // Pages-Component

    HrEmployeeCalendarComponent,                        // Pages-Component


    HrAbsenceRequestsComponent,                         // Pages-Component
    HrAttendanceAbsenceViewComponent,                   // Shared-Component - Manage Attendance

    HrDashboardAuthComponent,                           // Pages-Component - Manage Authorization
    HrAuthDashboardViewComponent,                       // Shared-Component - Manage Authorization
    HrAuthDashboardDetailsCommonViewComponent,          // Shared-Component - Manage Authorization
    HrAuthDashboardRemoveComponent,                     // Shared-Component - Manage Authorization
    HrAuthDashboardSetAsDefaultComponent,               // Shared-Component - Manage Authorization
    HrAuthDashboardSetExpiryComponent,                  // Shared-Component - Manage Authorization

    HrAttendanceCustomTimingComponent,                  // Pages-Component - Manage Attendance
    HrAttendanceRunComponent,                           // Pages-Component - Manage Attendance
    HrAttendanceRunDetailViewComponent,                 // Pages-Component - Manage Attendance

    HrAllowanceTypeComponent,                           // Pages-Component - Manage Allowance
    HrAllowanceTypeRateComponent,                       // Pages-Component - Manage Allowance
    HrAllowanceTypeAssignComponent,                     // Pages-Component - Manage Allowance
    HrAllowanceRecordsComponent,                        // Pages-Component - Manage Allowance
    HrAllowanceSalaryKeyComponent,                      // Pages-Component - Manage Allowance

    HrOtRequestsViewCardComponent,                      // Shared-Component
    HrOtRequestsViewListComponent,                      // Shared-Component
    HrOtRequestsViewTableComponent,                     // Shared-Component
    HrOtRequestsExtendBulkModelComponent,               // Shared-Component
    HrOtRequestsDetailViewModelComponent,               // Shared-Component
    HrOtRequestsShotenModelComponent,                   // Shared-Component

    HrLeaveRequestsViewCardComponent,                   // Shared-Component
    HrLeaveRequestsViewListComponent,                   // Shared-Component
    HrLeaveRequestsViewTableComponent,                  // Shared-Component
    HrLeaveRequestsDetailViewModelComponent,            // Shared-Component
    HrLeaveRequestsExtendBulkModelComponent,            // Shared-Component
    HrLeaveRequestsExtendModelComponent,                // Shared-Component
    HrLeaveRequestsShotenModelComponent,                // Shared-Component

    HrExtendLeaveComponent,                             // Shared-Component
    HrExtendLeaveViewCardComponent,                     // Shared-Component
    HrExtendLeaveViewListComponent,                     // Shared-Component
    HrExtendLeaveViewTableComponent,                    // Shared-Component

    HrExtendOtComponent,                                // Shared-Component
    HrExtendOtViewCardComponent,                        // Shared-Component
    HrExtendOtViewListComponent,                        // Shared-Component
    HrExtendOtViewTableComponent,                       // Shared-Component

    HrUploadOtViewTableComponent,                       // Shared-Component
    HrUploadOtUploadBulkModelComponent,                 // Shared-Component
    HrLeaveRequestsSapUploadModelComponent,             // Shared-Component

    HrUploadLeaveRejectComponent,                       // Shared-Component
    HrUploadOtRejectComponent,                          // Shared-Component

    HrUploadLeaveDetailViewModelComponent,              // Shared-Component
    HrUploadOtDetailViewModelComponent,                 // Shared-Component

    DivisionViewCardComponent,                          // Shared-Component
    DivisionViewListComponent,                          // Shared-Component
    DivisionViewTableComponent,                         // Shared-Component

    DepartmentViewCardComponent,                        // Shared-Component
    DepartmentViewListComponent,                        // Shared-Component
    DepartmentViewTableComponent,                       // Shared-Component

    SectionViewCardComponent,                           // Shared-Component
    SectionViewListComponent,                           // Shared-Component
    SectionViewTableComponent,                          // Shared-Component

    HrRemoteEmployeeViewCardComponent,                  // Shared-Component
    HrRemoteEmployeeViewListComponent,                  // Shared-Component
    HrRemoteEmployeeViewTableComponent,                 // Shared-Component
    HrRemoteEmployeeDetailViewModelComponent,           // Shared-Component

    HrEmployeeProfileViewCardComponent,                  // Shared-Component
    HrEmployeeProfileViewListComponent,                  // Shared-Component
    HrEmployeeProfileViewTableComponent,                 // Shared-Component
    HrEmployeeProfileDetailViewModelComponent,           // Shared-Component
    HrEmployeeProfileDetailComponent,                    // Shared-Component
    HrEmployeeProfileBasicInfoComponent,                 // Shared-Component
    HrEmployeeProfileAddressInfoComponent,               // Shared-Component
    HrEmployeeProfileAccessControlComponent,             // Shared-Component
    HrEmployeeProfileEducationComponent,                 // Shared-Component
    HrEmployeeProfileExperienceComponent,                // Shared-Component
    HrEmployeeProfileFamilyComponent,                    // Shared-Component
    HrEmployeeProfileSkillsComponent,                    // Shared-Component

    EmployeeProfileUpdatesViewCardComponent,             // Shared-Component
    EmployeeProfileUpdatesViewListComponent,             // Shared-Component
    EmployeeProfileUpdatesViewTableComponent,            // Shared-Component
    EmployeeProfileUpdatesDetailViewModelComponent,      // Shared-Component

    EmployeeAccessControlViewCardComponent,             // Shared-Component
    EmployeeAccessControlViewListComponent,             // Shared-Component
    EmployeeAccessControlViewTableComponent,            // Shared-Component

    HrUploadLeaveViewTableComponent,                    // Shared-Component
    HrUploadLeaveUploadBulkModelComponent,              // Shared-Component


    HrAllowanceTypeViewComponent,                       // Shared-Component
    HrAllowanceTypeRateViewComponent,                   // Shared-Component
    HrAllowanceTypeAssignViewComponent,                 // Shared-Component
    HrAllowanceRecordsViewComponent,                    // Shared-Component

    HrAllowanceTypeCommonViewComponent,                 // Shared-Component
    HrAllowanceTypeAssignCommonViewComponent,           // Shared-Component
    HrAllowanceTypeRateCommonViewComponent,             // Shared-Component

    HrAllowanceTypeCreateComponent,                     // Shared-Component
    HrAllowanceTypeAssignCreateComponent,               // Shared-Component
    HrAllowanceTypeRateCreateComponent,                 // Shared-Component
    HrAllowanceTypeAssignToEmployeeComponent,           // Shared-Component

    HrAllowanceTypeDeleteComponent,                     // Shared-Component
    HrAllowanceTypeAssignDeleteComponent,               // Shared-Component
    HrAllowanceTypeRateDeleteComponent,                 // Shared-Component

    HrAllowanceSalaryKeyCommonViewComponent,            // Shared-Component
    HrAllowanceSalaryKeyCreateComponent,                // Shared-Component
    HrAllowanceSalaryKeyDeleteComponent,                // Shared-Component
    HrAllowanceSalaryKeyViewComponent,                  // Shared-Component

    HrAttendanceCustomTimingViewComponent,              // Shared-Component
    HrAttendanceCustomTimingCommonViewComponent,        // Shared-Component
    HrAttendanceCustomTimingCreateComponent,            // Shared-Component
    HrAttendanceCustomTimingDeleteComponent,            // Shared-Component

    HrAttendanceRunCommonViewComponent,                 // Shared-Component
    HrAttendanceRunViewComponent,                       // Shared-Component
    HrAttendanceManualRunCreateComponent,               // Shared-Component
    HrAttendanceRerunComponent,                         // Shared-Component
    HrAttendanceRunDetailViewComponent,                 // Shared-Component

    HrAttendanceRunDetailComponent,
    HrAttendanceRunFullDetailViewComponent,             // Shared-Component
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    FullCalendarModule,               // for FullCalendar!
    PdfViewerModule,                  // PdfViewerModule
    QrCodeModule,
    CoreLayoutModule,                                   // ShareModule-CoreLayout (Global)
    LayoutModule,                                       // ShareModule-Layouts (Global)
    ComponentLibraryModule,                             // ShareModule-Component Library (Global)
    HrDeskRoutingModule,                                // Routing
  ],
  exports: [
    HrDeskHomeComponent,
    HrLettersComponent,                                 // Pages-Component
    HrHolidaysComponent,                                // Pages-Component

    HrOtRequestsComponent,                              // Pages-Component
    HrSapUploadOtComponent,                             // Pages-Component

    HrLeaveRequestsComponent,                           // Pages-Component
    HrSapUploadLeaveComponent,                          // Pages-Component

    HrEmployeeProfileComponent,                         // Pages-Component
    HrEmployeeProfileUpdatesComponent,                  // Pages-Component
    HrEmployeeProfileComponent,                         // Pages-Component
    HrEmployeeAccessControlComponent,                   // Pages-Component
    HrRemoteEmployeeComponent,                          // Pages-Component

    HrDashboardAuthComponent,                           // Pages-Component

    HrManageOrganizationComponent,                      // Pages-Component
    HrManageDivisionComponent,                          // Pages-Component
    HrManageDepartmentComponent,                        // Pages-Component
    HrManageSectionComponent,                           // Pages-Component

    HrEmployeeCalendarComponent,                        // Pages-Component


    HrAbsenceRequestsComponent,                         // Pages-Component
    HrAttendanceAbsenceViewComponent,                   // Shared-Component - Manage Attendance

    HrLettersViewCardComponent,                         // Shared-Component
    HrLettersViewListComponent,                         // Shared-Component
    HrLettersViewTableComponent,                        // Shared-Component
    HrLettersUploadBulkModelComponent,                  // Shared-Component
    HrLettersDetailViewModelComponent,                  // Shared-Component

    HrHolidaysViewCardComponent,                        // Shared-Component
    HrHolidaysViewListComponent,                        // Shared-Component
    HrHolidaysViewTableComponent,                       // Shared-Component
    HrHolidaysDetailViewModelComponent,                 // Shared-Component

    HrOtRequestsViewCardComponent,                      // Shared-Component
    HrOtRequestsViewListComponent,                      // Shared-Component
    HrOtRequestsViewTableComponent,                     // Shared-Component
    HrOtRequestsExtendBulkModelComponent,               // Shared-Component
    HrOtRequestsDetailViewModelComponent,               // Shared-Component

    HrLeaveRequestsViewCardComponent,                   // Shared-Component
    HrLeaveRequestsViewListComponent,                   // Shared-Component
    HrLeaveRequestsViewTableComponent,                  // Shared-Component
    HrLeaveRequestsDetailViewModelComponent,            // Shared-Component
    HrLeaveRequestsExtendBulkModelComponent,            // Shared-Component
    HrLeaveRequestsExtendModelComponent,                // Shared-Component

    HrExtendLeaveComponent,                             // Shared-Component
    HrExtendLeaveViewCardComponent,                     // Shared-Component
    HrExtendLeaveViewListComponent,                     // Shared-Component
    HrExtendLeaveViewTableComponent,                    // Shared-Component

    HrExtendOtComponent,                                // Shared-Component
    HrExtendOtViewCardComponent,                        // Shared-Component
    HrExtendOtViewListComponent,                        // Shared-Component
    HrExtendOtViewTableComponent,                       // Shared-Component

    HrUploadOtViewTableComponent,                       // Shared-Component
    HrUploadOtUploadBulkModelComponent,                 // Shared-Component
    HrLeaveRequestsSapUploadModelComponent,             // Shared-Component

    DivisionViewCardComponent,                          // Shared-Component
    DivisionViewListComponent,                          // Shared-Component
    DivisionViewTableComponent,                         // Shared-Component

    DepartmentViewCardComponent,                        // Shared-Component
    DepartmentViewListComponent,                        // Shared-Component
    DepartmentViewTableComponent,                       // Shared-Component

    SectionViewCardComponent,                           // Shared-Component
    SectionViewListComponent,                           // Shared-Component
    SectionViewTableComponent,                          // Shared-Component

    HrRemoteEmployeeViewCardComponent,                  // Shared-Component
    HrRemoteEmployeeViewListComponent,                  // Shared-Component
    HrRemoteEmployeeViewTableComponent,                 // Shared-Component
    HrRemoteEmployeeDetailViewModelComponent,           // Shared-Component

    HrEmployeeProfileViewCardComponent,                  // Shared-Component
    HrEmployeeProfileViewListComponent,                  // Shared-Component
    HrEmployeeProfileViewTableComponent,                 // Shared-Component
    HrEmployeeProfileDetailViewModelComponent,           // Shared-Component
    HrEmployeeProfileDetailComponent,                    // Shared-Component
    HrEmployeeProfileBasicInfoComponent,                 // Shared-Component
    HrEmployeeProfileAddressInfoComponent,               // Shared-Component
    HrEmployeeProfileAccessControlComponent,             // Shared-Component
    HrEmployeeProfileEducationComponent,                 // Shared-Component
    HrEmployeeProfileExperienceComponent,                // Shared-Component
    HrEmployeeProfileFamilyComponent,                    // Shared-Component
    HrEmployeeProfileSkillsComponent,                    // Shared-Component

    EmployeeProfileUpdatesViewCardComponent,             // Shared-Component
    EmployeeProfileUpdatesViewListComponent,             // Shared-Component
    EmployeeProfileUpdatesViewTableComponent,            // Shared-Component
    EmployeeProfileUpdatesDetailViewModelComponent,      // Shared-Component

    EmployeeAccessControlViewCardComponent,             // Shared-Component
    EmployeeAccessControlViewListComponent,             // Shared-Component
    EmployeeAccessControlViewTableComponent,            // Shared-Component

    HrUploadLeaveViewTableComponent,                    // Shared-Component
    HrUploadLeaveUploadBulkModelComponent,              // Shared-Component


    HrAllowanceTypeViewComponent,                       // Shared-Component
    HrAllowanceTypeRateViewComponent,                   // Shared-Component
    HrAllowanceTypeAssignViewComponent,                 // Shared-Component
    HrAllowanceRecordsViewComponent,                    // Shared-Component

    HrAllowanceTypeCommonViewComponent,                 // Shared-Component
    HrAllowanceTypeAssignCommonViewComponent,           // Shared-Component
    HrAllowanceTypeRateCommonViewComponent,             // Shared-Component

    HrAllowanceTypeCreateComponent,                     // Shared-Component
    HrAllowanceTypeAssignCreateComponent,               // Shared-Component
    HrAllowanceTypeRateCreateComponent,                 // Shared-Component

    HrAllowanceTypeDeleteComponent,                     // Shared-Component
    HrAllowanceTypeAssignDeleteComponent,               // Shared-Component
    HrAllowanceTypeRateDeleteComponent,                 // Shared-Component
  ],
  providers: [
    // AttendanceBaseService,                              // Service
  ]
})
export class HrDeskModule { }
