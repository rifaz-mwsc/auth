import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Routing
import { AttendanceAutomationRoutingModule } from './attendance-automation-routing.module';
// Layout Components

// Pages
import { GenerateDailyAttendanceComponent } from './pages/generate-daily-attendance/generate-daily-attendance.component';
import { GenerateDailyAttendanceDeatilsComponent } from './pages/generate-daily-attendance-deatils/generate-daily-attendance-deatils.component';
import { CreateCustomTimingComponent } from './pages/create-custom-timing/create-custom-timing.component';
import { ViewCustomTimingComponent } from './pages/view-custom-timing/view-custom-timing.component';
// Shared Components
import { AttendanceReportComponent } from './shared/components/attendance-detail/attendance-report/attendance-report.component';
import { AttendanceDetailCardComponent } from './shared/components/attendance-detail/attendance-detail-card/attendance-detail-card.component';
import { AttendanceDetailComponent } from './shared/components/attendance-detail/attendance-detail/attendance-detail.component';
import { AttendanceReportViewCardComponent } from './shared/components/attendance-report/attendance-report-view-card/attendance-report-view-card.component';
import { AttendanceReportViewListComponent } from './shared/components/attendance-report/attendance-report-view-list/attendance-report-view-list.component';
import { AttendanceReportViewTableComponent } from './shared/components/attendance-report/attendance-report-view-table/attendance-report-view-table.component';
// Services
import { AttendanceBaseService } from './shared/services/attendance-base.service';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';


@NgModule({
  declarations: [
    GenerateDailyAttendanceComponent,                   // Pages-Component
    GenerateDailyAttendanceDeatilsComponent,            // Pages-Component
    CreateCustomTimingComponent,                        // Pages-Component
    ViewCustomTimingComponent,                          // Pages-Component
    AttendanceDetailComponent,                          // Shared-Component
    AttendanceDetailCardComponent,                      // Shared-Component
    AttendanceReportComponent,                          // Shared-Component
    AttendanceReportViewCardComponent,                  // Shared-Component
    AttendanceReportViewListComponent,                  // Shared-Component
    AttendanceReportViewTableComponent,                 // Shared-Component
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreLayoutModule,                                   // ShareModule-CoreLayout (Global)
    LayoutModule,                                       // ShareModule-Layouts (Global)
    ComponentLibraryModule,                             // ShareModule-Component Library (Global)
    AttendanceAutomationRoutingModule,                  // Routing
  ],
  exports: [
    GenerateDailyAttendanceComponent,                   // Pages-Component
    GenerateDailyAttendanceDeatilsComponent,            // Pages-Component
    CreateCustomTimingComponent,                        // Pages-Component
    ViewCustomTimingComponent,                          // Pages-Component
    AttendanceDetailComponent,                          // Shared-Component
    AttendanceDetailCardComponent,                      // Shared-Component
    AttendanceReportComponent,                          // Shared-Component
    AttendanceReportViewCardComponent,                  // Shared-Component
    AttendanceReportViewListComponent,                  // Shared-Component
    AttendanceReportViewTableComponent,                 // Shared-Component
  ],
  providers: [
    AttendanceBaseService,                              // Service
  ]
})
export class AttendanceAutomationModule { }
