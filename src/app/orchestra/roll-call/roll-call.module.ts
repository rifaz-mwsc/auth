import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Routing
import { RollCallRoutingModule } from './roll-call-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Layout Components
import { RollCallHomeComponent } from './roll-call-home/roll-call-home.component';
// Page Components

// Shared Components

// Shared-Components-Model

// Services
import { RollCallBaseService } from './shared/services/roll-call-base.service';


@NgModule({
  declarations: [
    RollCallHomeComponent,                                // Layout-Component
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreLayoutModule,                                     // ShareModule-CoreLayout (Global)
    LayoutModule,                                         // ShareModule-Layouts (Global)
    ComponentLibraryModule,                               // ShareModule-Component Library (Global)
    RollCallRoutingModule
  ],
  exports: [
    RollCallHomeComponent,                                 // Layout-Component
    // GenerateDailyAttendanceComponent,                   // Page-Component
    // AttendanceDetailComponent,                          // Shared-Component
  ],
  providers: [
    RollCallBaseService,                              // Service
  ]
})
export class RollCallModule { }
