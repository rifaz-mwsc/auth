import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-hr-extend-ot-view-list',
  templateUrl: './hr-extend-ot-view-list.component.html',
  styleUrls: ['./hr-extend-ot-view-list.component.scss']
})
export class HrExtendOtViewListComponent implements OnInit {

  // Item Detail Model
  showModelLoader: boolean = false;
  selecteditem: any = [];
  requestDetails: any = [];

  @Input() requestList: any;
  @Input() showLoader: boolean;

  @ViewChild('ListViewRecordDetailsModal', { static: false }) ListViewRecordDetailsModal: ElementRef;
  @ViewChild('ListExtendRecordDetailsModal', { static: false }) ListExtendRecordDetailsModal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  hideViewRecordDetailsModal() {
    $('#ListViewRecordDetailsModal').modal('hide');
  }

  showViewRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#ListViewRecordDetailsModal').modal('show');
  }

  
  hideExtendRecordDetailsModal() {
    $('#ListExtendRecordDetailsModal').modal('hide');
  }

  showExtendRecordDetailsModal(selecteditem) {
    this.selecteditem = selecteditem;
    $('#ListExtendRecordDetailsModal').modal('show');
  }


}
