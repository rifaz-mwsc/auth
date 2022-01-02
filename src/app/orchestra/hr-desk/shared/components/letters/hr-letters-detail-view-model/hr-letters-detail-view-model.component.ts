import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hr-letters-detail-view-model',
  templateUrl: './hr-letters-detail-view-model.component.html',
})
export class HrLettersDetailViewModelComponent implements OnInit {

  @Input() selecteditem: any;
  @Input() itemDeatils: any;
  @Input() showModelLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
