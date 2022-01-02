import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { ComponentLibraryRoutingModule } from './component-library-routing.module';
// Components
import { CompLibLoadingComponent } from './components/comp-lib-loading/comp-lib-loading.component';
import { CompLibPaginationComponent } from './components/comp-lib-pagination/comp-lib-pagination.component';
// Component-Loading
import { ClibLoadingLgComponent } from './components/loading/clib-loading-lg/clib-loading-lg.component';
import { ClibLoadingXlComponent } from './components/loading/clib-loading-xl/clib-loading-xl.component';
import { ClibLoadingMdComponent } from './components/loading/clib-loading-md/clib-loading-md.component';
import { ClibLoadingSmComponent } from './components/loading/clib-loading-sm/clib-loading-sm.component';
import { ClibLoadingXsComponent } from './components/loading/clib-loading-xs/clib-loading-xs.component';
// Component-Service Application
import { ClibServiceApplicationFormComponent } from './components/online-application/clib-service-application-form/clib-service-application-form.component';
import { ClibServiceApplicationFormAttchmentComponent } from './components/online-application/clib-service-application-form-attchment/clib-service-application-form-attchment.component';
import { ClibServiceApplicationFormTextFieldComponent } from './components/online-application/clib-service-application-form-text-field/clib-service-application-form-text-field.component';
import { ClibServiceApplicationFormFileTileComponent } from './components/online-application/clib-service-application-form-file-tile/clib-service-application-form-file-tile.component';
// Component-Service E-Directory
import { ClibEDirectoryViewCardComponent } from './components/e-directory/clib-e-directory-view-card/clib-e-directory-view-card.component';
import { ClibEDirectoryViewListComponent } from './components/e-directory/clib-e-directory-view-list/clib-e-directory-view-list.component';
import { ClibEDirectoryViewTableComponent } from './components/e-directory/clib-e-directory-view-table/clib-e-directory-view-table.component';
import { ClibDutyrosterShiftgroupComponent } from './components/dutyroster/clib-dutyroster-shiftgroup/clib-dutyroster-shiftgroup.component';
import { ClibDutyrosterShiftgroupViewCardComponent } from './components/dutyroster/clib-dutyroster-shiftgroup-view-card/clib-dutyroster-shiftgroup-view-card.component';
import { ClibDutyrosterShiftgroupViewListComponent } from './components/dutyroster/clib-dutyroster-shiftgroup-view-list/clib-dutyroster-shiftgroup-view-list.component';
import { ClibDutyrosterShiftgroupViewTableComponent } from './components/dutyroster/clib-dutyroster-shiftgroup-view-table/clib-dutyroster-shiftgroup-view-table.component';
// Component-Service Staff-Portal
import { ClibLeaveStatusDescriptionComponent } from './components/staff-portal/clib-leave-status-description/clib-leave-status-description.component';
import { ClibOtPriorApprovalStatusDescriptionComponent } from './components/staff-portal/clib-ot-prior-approval-status-description/clib-ot-prior-approval-status-description.component';
import { ClibOvertimeStatusDescriptionComponent } from './components/staff-portal/clib-overtime-status-description/clib-overtime-status-description.component';

// Page Alert
import { ClibPageAlertComponent } from './components/clib-page-alert/clib-page-alert.component';



@NgModule({
  declarations: [
    CompLibLoadingComponent,                            // Component Libary-Component
    CompLibPaginationComponent,                         // Component Libary-Component
    ClibLoadingXlComponent,                             // Component Libary-Loading Component
    ClibLoadingLgComponent,                             // Component Libary-Loading Component
    ClibLoadingMdComponent,                             // Component Libary-Loading Component
    ClibLoadingSmComponent,                             // Component Libary-Loading Component
    ClibLoadingXsComponent,                             // Component Libary-Loading Component
    ClibServiceApplicationFormComponent,                // Component Libary-Service Application Component
    ClibServiceApplicationFormTextFieldComponent,       // Component Libary-Service Application Component
    ClibServiceApplicationFormAttchmentComponent,       // Component Libary-Service Application Component
    ClibServiceApplicationFormFileTileComponent,        // Component Libary-Service Application Component
    ClibEDirectoryViewCardComponent,                    // Component Libary-E-Directory Component
    ClibEDirectoryViewListComponent,                    // Component Libary-E-Directory Component
    ClibEDirectoryViewTableComponent,                   // Component Libary-E-Directory Component
    ClibDutyrosterShiftgroupComponent,                  // Component Libary-Dutyroster Component
    ClibDutyrosterShiftgroupViewCardComponent,          // Component Libary-Dutyroster Component
    ClibDutyrosterShiftgroupViewListComponent,          // Component Libary-Dutyroster Component
    ClibDutyrosterShiftgroupViewTableComponent,         // Component Libary-Dutyroster Component
    ClibLeaveStatusDescriptionComponent,                // Component Libary-Staff-Portal Component
    ClibOtPriorApprovalStatusDescriptionComponent,      // Component Libary-Staff-Portal Component
    ClibOvertimeStatusDescriptionComponent,             // Component Libary-Staff-Portal Component
    ClibPageAlertComponent                              // Component Libary-Page Alert Component
  ],
  imports: [
    CommonModule,
    ComponentLibraryRoutingModule,
  ],
  exports: [
    CompLibLoadingComponent,                            // Component Libary-Component
    CompLibPaginationComponent,                         // Component Libary-Component
    ClibLoadingXlComponent,                             // Component Libary-Loading Component
    ClibLoadingLgComponent,                             // Component Libary-Loading Component
    ClibLoadingMdComponent,                             // Component Libary-Loading Component
    ClibLoadingSmComponent,                             // Component Libary-Loading Component
    ClibLoadingXsComponent,                             // Component Libary-Loading Component
    ClibServiceApplicationFormComponent,                // Component Libary-Service Application Component
    ClibServiceApplicationFormTextFieldComponent,       // Component Libary-Service Application Component
    ClibServiceApplicationFormAttchmentComponent,       // Component Libary-Service Application Component
    ClibServiceApplicationFormFileTileComponent,        // Component Libary-Service Application Component
    ClibEDirectoryViewCardComponent,                    // Component Libary-E-Directory Component
    ClibEDirectoryViewListComponent,                    // Component Libary-E-Directory Component
    ClibEDirectoryViewTableComponent,                   // Component Libary-E-Directory Component
    ClibLeaveStatusDescriptionComponent,                // Component Libary-Staff-Portal Component
    ClibOtPriorApprovalStatusDescriptionComponent,      // Component Libary-Staff-Portal Component
    ClibOvertimeStatusDescriptionComponent,             // Component Libary-Staff-Portal Component
    ClibPageAlertComponent                              // Component Libary-Page Alert Component
  ],
  providers: [
  ],
})
export class ComponentLibraryModule { }
