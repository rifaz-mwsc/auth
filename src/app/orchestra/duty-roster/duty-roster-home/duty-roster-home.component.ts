import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-duty-roster-home',
  templateUrl: './duty-roster-home.component.html',
  styleUrls: ['./duty-roster-home.component.scss']
})
export class DutyRosterHomeComponent implements OnInit {

  displayName: any;
  displayPicture: any;

  shiftGroupManage: any ='manage';
  shiftGroupSelect:  any ='select-shift-group';

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
