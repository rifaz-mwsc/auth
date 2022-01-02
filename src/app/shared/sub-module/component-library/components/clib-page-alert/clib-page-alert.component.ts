import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clib-page-alert',
  templateUrl: './clib-page-alert.component.html',
  styleUrls: ['./clib-page-alert.component.scss']
})
export class ClibPageAlertComponent implements OnInit {

  @Input() pageInfo: any;
  @Input() request: any;
  @Input() showLoader: any;
  @Input() generalApiError: any;
  @Input() modelStateError: any;

  constructor() { }

  ngOnInit() {
  }

}
