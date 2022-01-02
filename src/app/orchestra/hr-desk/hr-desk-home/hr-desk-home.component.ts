import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-hr-desk-home',
  templateUrl: './hr-desk-home.component.html',
  styleUrls: ['./hr-desk-home.component.scss']
})
export class HrDeskHomeComponent implements OnInit {

  // Application Version
  appVersion: any = environment.appVersion;
  displayName: any;
  displayPicture: any;

  // Pagination Data
  sideMenu: any = environment.appConfig.hrDesk.sideMenu;

  constructor(public sanitizer: DomSanitizer) {
    this.getDisplayProfile();
  }

  ngOnInit() {
  }

  getDisplayProfile() {
    this.displayName = JSON.parse(localStorage.getItem('displayName'));
    this.displayPicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('displayPicture'));
  }

}
