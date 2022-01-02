import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Adal8Service } from 'adal-angular8';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private router: Router, private adal: Adal8Service, private zone: NgZone) { }

  ngOnInit() {
    this.adal.handleWindowCallback();

    setTimeout(() => {
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    }, 200);
  }

}
