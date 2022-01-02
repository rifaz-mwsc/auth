import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { OrchestraRoutingModule } from './orchestra-routing.module';
// Orchestra-Module
import { HrDeskModule } from './hr-desk/hr-desk.module';
import { DutyRosterModule } from './duty-roster/duty-roster.module';
import { MwscCommonModule } from './mwsc-common/mwsc-common.module';
// import { AdminConsoleModule } from './admin-console/admin-console.module';
// import { EServiceModule } from './e-service/e-service.module';
// import { FinanceModule } from './finance/finance.module';
// import { HumanResourcesModule } from './human-resources/human-resources.module';
// import { LabManagementSystemModule } from './lab-management-system/lab-management-system.module';
// import { NfcGuardPatrolModule } from './nfc-guard-patrol/nfc-guard-patrol.module';
// import { StaffPortalModule } from './staff-portal/staff-portal.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HrDeskModule,                      // Orchestra-Module
    DutyRosterModule,                  // Orchestra-Module
    MwscCommonModule,                  // Orchestra-Module
    // EServiceModule,                 // Orchestra-Module
    // FinanceModule,                  // Orchestra-Module
    // HumanResourcesModule,           // Orchestra-Module
    // LabManagementSystemModule,      // Orchestra-Module
    // NfcGuardPatrolModule,           // Orchestra-Module
    // StaffPortalModule,              // Orchestra-Module
    OrchestraRoutingModule,         // Routing
  ]
})
export class OrchestraModule { }
