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
// Routing
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Layout Components
import { DutyRosterHomeComponent } from './duty-roster-home/duty-roster-home.component';
// Pages Components
import { DutyrosterHrDashboardComponent } from './pages/dutyroster-hr-dashboard/dutyroster-hr-dashboard.component';
import { DutyrosterHrViewShiftGroupsComponent } from './pages/dutyroster-hr-manage-shift-group/dutyroster-hr-view-shift-groups/dutyroster-hr-view-shift-groups.component';
import { DutyrosterHrManageShiftGroupComponent } from './pages/dutyroster-hr-manage-shift-group/dutyroster-hr-manage-shift-group/dutyroster-hr-manage-shift-group.component';
import { DutyrosterHrManageWeeklyShiftsComponent } from './pages/dutyroster-hr-manage-shift-group/dutyroster-hr-manage-weekly-shifts/dutyroster-hr-manage-weekly-shifts.component';

import { DutyrosterHrCreateShiftComponent } from './pages/dutyroster-hr-create-shift/dutyroster-hr-create-shift.component';
import { DutyrosterHrOffshiftSapuploadComponent } from './pages/dutyroster-hr-offshift-sapupload/dutyroster-hr-offshift-sapupload.component';
import { DutyrosterHrShiftSapuploadComponent } from './pages/dutyroster-hr-shift-sapupload/dutyroster-hr-shift-sapupload.component';
import { DutyrosterHrShiftTemplateComponent } from './pages/dutyroster-hr-shift-template/dutyroster-hr-shift-template.component';
// Shared Components
import { ShiftTemplateViewCardComponent } from './shared/components/shift-template/shift-template-view-card/shift-template-view-card.component';
import { ShiftTemplateViewTableComponent } from './shared/components/shift-template/shift-template-view-table/shift-template-view-table.component';
import { ShiftTemplateViewListComponent } from './shared/components/shift-template/shift-template-view-list/shift-template-view-list.component';

import { ShiftTemplateTimeViewCardComponent } from './shared/components/shift-template-time/shift-template-time-view-card/shift-template-time-view-card.component';
import { ShiftTemplateTimeViewListComponent } from './shared/components/shift-template-time/shift-template-time-view-list/shift-template-time-view-list.component';
import { ShiftTemplateTimeViewTableComponent } from './shared/components/shift-template-time/shift-template-time-view-table/shift-template-time-view-table.component';

import { ShiftgroupViewCardComponent } from './shared/components/shiftgroup/shiftgroup-view-card/shiftgroup-view-card.component';
import { ShiftgroupViewListComponent } from './shared/components/shiftgroup/shiftgroup-view-list/shiftgroup-view-list.component';
import { ShiftgroupViewTableComponent } from './shared/components/shiftgroup/shiftgroup-view-table/shiftgroup-view-table.component';
import { WeeklyshiftManageViewCardComponent } from './shared/components/weeklyshift-manage/weeklyshift-manage-view-card/weeklyshift-manage-view-card.component';
import { WeeklyshiftManageViewListComponent } from './shared/components/weeklyshift-manage/weeklyshift-manage-view-list/weeklyshift-manage-view-list.component';
import { WeeklyshiftManageViewTableComponent } from './shared/components/weeklyshift-manage/weeklyshift-manage-view-table/weeklyshift-manage-view-table.component';

import { DutyrosterHrShiftgroupComponent } from './shared/components/shiftgroup/dutyroster-hr-shiftgroup/dutyroster-hr-shiftgroup.component';
import { DutyrosterHrWeeklyshiftManageComponent } from './shared/components/weeklyshift-manage/dutyroster-hr-weeklyshift-manage/dutyroster-hr-weeklyshift-manage.component';

import { ShiftgroupCreateModelComponent } from './shared/components/shiftgroup/shiftgroup-create-model/shiftgroup-create-model.component';
import { OffshiftSapuploadViewListComponent } from './shared/components/offshift-sapupload/offshift-sapupload-view-list/offshift-sapupload-view-list.component';
import { OffshiftSapuploadViewTableComponent } from './shared/components/offshift-sapupload/offshift-sapupload-view-table/offshift-sapupload-view-table.component';
import { ShiftSapuploadViewListComponent } from './shared/components/shift-sapupload/shift-sapupload-view-list/shift-sapupload-view-list.component';
import { ShiftSapuploadViewTableComponent } from './shared/components/shift-sapupload/shift-sapupload-view-table/shift-sapupload-view-table.component';

// Services
import { DutyRosterBaseService } from './shared/services/duty-roster-base.service';
import { ShiftgroupManageEmployeesViewCardComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-employees-view-card/shiftgroup-manage-employees-view-card.component';
import { ShiftgroupManageSupervisorsViewCardComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-supervisors-view-card/shiftgroup-manage-supervisors-view-card.component';
import { ShiftgroupManageYearsViewCardComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-years-view-card/shiftgroup-manage-years-view-card.component';
import { ShiftgroupManageYearsViewListComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-years-view-list/shiftgroup-manage-years-view-list.component';
import { ShiftgroupManageYearsViewTableComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-years-view-table/shiftgroup-manage-years-view-table.component';
import { ShiftgroupManageEmployeesViewListComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-employees-view-list/shiftgroup-manage-employees-view-list.component';
import { ShiftgroupManageEmployeesViewTableComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-employees-view-table/shiftgroup-manage-employees-view-table.component';
import { ShiftgroupManageSupervisorsViewListComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-supervisors-view-list/shiftgroup-manage-supervisors-view-list.component';
import { ShiftgroupManageSupervisorsViewTableComponent } from './shared/components/shiftgroup-manage/shiftgroup-manage-supervisors-view-table/shiftgroup-manage-supervisors-view-table.component';


@NgModule({
  declarations: [
    DutyRosterHomeComponent,                            // Layout-Components
    DutyrosterHrCreateShiftComponent,                   // Pages-Components
    DutyrosterHrDashboardComponent,                     // Pages-Components
    DutyrosterHrViewShiftGroupsComponent,               // Pages-Components
    DutyrosterHrManageShiftGroupComponent,              // Pages-Components
    DutyrosterHrManageWeeklyShiftsComponent,            // Pages-Components
    DutyrosterHrOffshiftSapuploadComponent,             // Pages-Components
    DutyrosterHrShiftSapuploadComponent,                // Pages-Components
    DutyrosterHrShiftTemplateComponent,                 // Pages-Components
    ShiftTemplateViewCardComponent,                     // Shared-Components
    ShiftTemplateViewListComponent,                     // Shared-Components
    ShiftTemplateViewTableComponent,                    // Shared-Components
    ShiftTemplateTimeViewCardComponent,                 // Shared-Components
    ShiftTemplateTimeViewListComponent,                 // Shared-Components
    ShiftTemplateTimeViewTableComponent,                // Shared-Components
    ShiftgroupViewCardComponent,                        // Shared-Components
    ShiftgroupViewListComponent,                        // Shared-Components
    ShiftgroupViewTableComponent,                       // Shared-Components
    ShiftgroupViewCardComponent,                        // Shared-Components
    ShiftgroupViewListComponent,                        // Shared-Components
    ShiftgroupViewTableComponent,                       // Shared-Components
    ShiftgroupManageEmployeesViewCardComponent,         // Shared-Components
    ShiftgroupManageEmployeesViewListComponent,         // Shared-Components
    ShiftgroupManageEmployeesViewTableComponent,        // Shared-Components
    ShiftgroupManageSupervisorsViewCardComponent,       // Shared-Components
    ShiftgroupManageSupervisorsViewListComponent,       // Shared-Components
    ShiftgroupManageSupervisorsViewTableComponent,      // Shared-Components
    ShiftgroupManageYearsViewCardComponent,             // Shared-Components
    ShiftgroupManageYearsViewListComponent,             // Shared-Components
    ShiftgroupManageYearsViewTableComponent,            // Shared-Components
    WeeklyshiftManageViewCardComponent,                 // Shared-Components
    WeeklyshiftManageViewListComponent,                 // Shared-Components
    WeeklyshiftManageViewTableComponent,                // Shared-Components
    DutyrosterHrShiftgroupComponent,                    // Shared-Components
    DutyrosterHrWeeklyshiftManageComponent,             // Shared-Components
    ShiftgroupCreateModelComponent,                     // Shared-Components
    OffshiftSapuploadViewListComponent,                 // Shared-Components
    OffshiftSapuploadViewTableComponent,                // Shared-Components
    ShiftSapuploadViewListComponent,                    // Shared-Components
    ShiftSapuploadViewTableComponent,                   // Shared-Components
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    FullCalendarModule,                           // for FullCalendar!
    PdfViewerModule,                              // PdfViewerModule
    CoreLayoutModule,                                   // ShareModule-CoreLayout (Global)
    LayoutModule,                                       // ShareModule-Layouts (Global)
    ComponentLibraryModule,                             // ShareModule-Component Library (Global)
    DutyRosterRoutingModule
  ],
  exports: [

  ],
  providers: [
    DutyRosterBaseService
  ],
})
export class DutyRosterModule { }
