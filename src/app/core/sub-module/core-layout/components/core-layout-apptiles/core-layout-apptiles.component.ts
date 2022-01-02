import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../../../environments/environment'

@Component({
  selector: 'app-core-layout-apptiles',
  templateUrl: './core-layout-apptiles.component.html',
  styleUrls: ['./core-layout-apptiles.component.scss']
})
export class CoreLayoutApptilesComponent implements OnInit {

  appConfig = environment.appConfig;

  constructor() { }

  ngOnInit() {
  }

}
