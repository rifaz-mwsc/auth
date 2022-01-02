import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hr-holidays-detail-view-model',
  templateUrl: './hr-holidays-detail-view-model.component.html',
  styleUrls: ['./hr-holidays-detail-view-model.component.scss']
})
export class HrHolidaysDetailViewModelComponent implements OnInit {

  @Input() selectedData: any;
  @Input() showLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
