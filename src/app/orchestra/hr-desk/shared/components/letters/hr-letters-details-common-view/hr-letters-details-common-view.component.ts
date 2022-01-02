import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hr-letters-details-common-view',
  templateUrl: './hr-letters-details-common-view.component.html',
})
export class HrLettersDetailsCommonViewComponent implements OnInit {

  @Input() selecteditem: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
