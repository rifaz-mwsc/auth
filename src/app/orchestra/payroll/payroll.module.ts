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
import { PayrollRoutingModule } from './payroll-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Layout

// Page Components
import { PayrollAllowanceTypeComponent } from './pages/manage-allowance/payroll-allowance-type/payroll-allowance-type.component';
import { PayrollAllowanceTypeRateComponent } from './pages/manage-allowance/payroll-allowance-type-rate/payroll-allowance-type-rate.component';
import { PayrollAllowanceTypeAssignComponent } from './pages/manage-allowance/payroll-allowance-type-assign/payroll-allowance-type-assign.component';
import { PayrollAllowanceRecordsComponent } from './pages/manage-allowance/payroll-allowance-records/payroll-allowance-records.component';
import { PrAlwRecordViewComponent } from './shared/components/allowance-records/pr-alw-record-view/pr-alw-record-view.component';
import { PrAlwTypeViewComponent } from './shared/components/allowance-type/pr-alw-type-view/pr-alw-type-view.component';
import { PrAlwTypeRateViewComponent } from './shared/components/allowance-type-assign/pr-alw-type-rate-view/pr-alw-type-rate-view.component';
import { PrAlwTypeRateCreateComponent } from './shared/components/allowance-type-assign/pr-alw-type-rate-create/pr-alw-type-rate-create.component';
import { PrAlwTypeRateDeleteComponent } from './shared/components/allowance-type-assign/pr-alw-type-rate-delete/pr-alw-type-rate-delete.component';
import { PrAlwTypeCreateComponent } from './shared/components/allowance-type/pr-alw-type-create/pr-alw-type-create.component';
import { PrAlwTypeDeleteComponent } from './shared/components/allowance-type/pr-alw-type-delete/pr-alw-type-delete.component';
import { PrAlwTypeAssignViewComponent } from './shared/components/allowance-type-rate/pr-alw-type-assign-view/pr-alw-type-assign-view.component';
import { PrAlwTypeAssignCreateComponent } from './shared/components/allowance-type-rate/pr-alw-type-assign-create/pr-alw-type-assign-create.component';
import { PrAlwTypeAssignDeleteComponent } from './shared/components/allowance-type-rate/pr-alw-type-assign-delete/pr-alw-type-assign-delete.component';



@NgModule({
  declarations: [
    PayrollAllowanceTypeComponent,                               // Pages-Component
    PayrollAllowanceTypeRateComponent,                           // Pages-Component
    PayrollAllowanceTypeAssignComponent,                         // Pages-Component
    PayrollAllowanceRecordsComponent,                            // Pages-Component

    PrAlwTypeViewComponent,                                      // Shared-Component
    PrAlwTypeCreateComponent,                                    // Shared-Component
    PrAlwTypeDeleteComponent,                                    // Shared-Component

    PrAlwTypeRateViewComponent,                                  // Shared-Component
    PrAlwTypeRateCreateComponent,                                // Shared-Component
    PrAlwTypeRateDeleteComponent,                                // Shared-Component

    PrAlwTypeAssignViewComponent,                                // Shared-Component
    PrAlwTypeAssignCreateComponent,                              // Shared-Component
    PrAlwTypeAssignDeleteComponent,                              // Shared-Component

    PrAlwRecordViewComponent,                                    // Shared-Component
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    FullCalendarModule,                                   // FullCalendarModule
    PdfViewerModule,                                      // PdfViewerModule
    CoreLayoutModule,                                            // ShareModule-CoreLayout (Global)
    LayoutModule,                                                // ShareModule-Layouts (Global)
    ComponentLibraryModule,                                      // ShareModule-Component Library (Global)
    PayrollRoutingModule,                                        // Routing
  ],
  exports: [
  ],
  providers: [
  ]
})
export class PayrollModule { }
