import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { RecruitmentRoutingModule } from './recruitment-routing.module';
// Shared Layout Components
import { CoreLayoutModule } from 'src/app/core/sub-module/core-layout/core-layout.module';
import { LayoutModule } from 'src/app/shared/sub-module/layout/layout.module';
import { ComponentLibraryModule } from 'src/app/shared/sub-module/component-library/component-library.module';
// Layout Components
import { RecruitmentHomeComponent } from './recruitment-home/recruitment-home.component';
// Page Components

// Shared Components

// Shared-Components-Model
// Services
import { RecruitmentBaseService } from './shared/services/recruitment-base.service';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    RecruitmentHomeComponent,                              // Layout-Component
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreLayoutModule,                                      // ShareModule-CoreLayout (Global)
    LayoutModule,                                          // ShareModule-Layout (Global)
    ComponentLibraryModule,                                // ShareModule-Component Library (Global)
    RecruitmentRoutingModule
  ],
  exports: [
    RecruitmentHomeComponent,                              // Layou-Component
    // GenerateDailyAttendanceComponent,                   // Page-Component
    // AttendanceDetailComponent,                          // Shared-Component
  ],
  providers: [
    RecruitmentBaseService,                                // Service
  ]
})
export class RecruitmentModule { }
