import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hr-extend-leave-view-table',
  templateUrl: './hr-extend-leave-view-table.component.html',
})
export class HrExtendLeaveViewTableComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];

  @Input() requestList: any;
  @Input() showLoader: boolean;

  @ViewChild('TableViewRecordDetailsModal', { static: false }) TableViewRecordDetailsModal: ElementRef;
  @ViewChild('TableExtendRecordDetailsModal', { static: false }) TableExtendRecordDetailsModal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  hideViewRecordDetailsModal() {
    $('#TableViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#TableViewRecordDetailsModal').modal('show');
  }

  hideExtendRecordDetailsModal() {
    $('#TableExtendRecordDetailsModal').modal('hide');
  }

  showExtendRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#TableExtendRecordDetailsModal').modal('show');
  }

}
