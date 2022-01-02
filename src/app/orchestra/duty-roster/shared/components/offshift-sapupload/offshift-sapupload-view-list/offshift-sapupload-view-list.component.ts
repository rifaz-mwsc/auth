import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-offshift-sapupload-view-list',
  templateUrl: './offshift-sapupload-view-list.component.html',
  styleUrls: ['./offshift-sapupload-view-list.component.scss']
})
export class OffshiftSapuploadViewListComponent implements OnInit {

  daysCount: any;
  selectedData: any;
  modelDataArray: any = [];

  @Input() requestList: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
