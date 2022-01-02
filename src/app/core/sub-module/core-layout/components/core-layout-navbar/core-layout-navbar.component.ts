import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../../../services/auth/auth.service';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-core-layout-navbar',
  templateUrl: './core-layout-navbar.component.html',
  styleUrls: ['./core-layout-navbar.component.scss']
})
export class CoreLayoutNavbarComponent implements OnInit {

  @Input() displayName: any;
  @Input() displayPicture: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
