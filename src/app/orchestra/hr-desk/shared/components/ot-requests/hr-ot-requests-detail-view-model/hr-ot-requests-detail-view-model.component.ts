import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-hr-ot-requests-detail-view-model',
  templateUrl: './hr-ot-requests-detail-view-model.component.html',
  styleUrls: ['./hr-ot-requests-detail-view-model.component.scss']
})
export class HrOtRequestsDetailViewModelComponent implements OnInit {

  // @Input() selectedData: any;
  // @Input() showLoader: boolean;

  // @Input() modelStateError: any;
  // @Input() generalApiError: boolean;

  rejectionReason: any;
  // Error Handling
  @Input() modelStateError: any;
  @Input() generalApiError: any;
  // Parent Component Data
  @Input() selecteditem: any;
  @Input() requestDetails: any;
  @Input() showModelLoader: boolean;

  visible: boolean = true;
  @Output() closeThisModel: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

   // Clear Error Message on Text On change
   onChangeEvent(event: any) {
    this.resetApiErrorModal('');
  }

  closeModel() {
    this.resetApiErrorModal('');
    this.requestDetails = [];
    // this.visible = !this.visible;
    this.closeThisModel.emit(null);
  }

  resetApiErrorModal(functionName) {
    this.modelStateError = [];
    this.generalApiError = null;
    this.viewConsoleLogApiErrorModal(functionName);
  }

  viewConsoleLogApiErrorModal(functionName) {
    console.log(functionName, ' -> modelStateError - ', this.modelStateError);
    console.log(functionName, ' -> generalApiError - ', this.generalApiError);
  }
}
