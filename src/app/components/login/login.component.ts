import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { Router, Event, NavigationEnd } from '@angular/router';
import OktaSignIn from '@okta/okta-signin-widget';
import  MyAppConfig  from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;
  // the pkce is Proof Key for Code Exchange
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth, private router: Router) {
    this.initiateAuthentication();
    this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        if (event.url === '/login') {
          console.log('login');
          await this.authenticate();
        }
      }
    });
  }

  ngOnInit() {
  };

  initiateAuthentication() {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      issuer: MyAppConfig.oidc.issuer,
      clientId: MyAppConfig.oidc.clientId,
      redirectUri: MyAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: MyAppConfig.oidc.issuer,
        scopes: MyAppConfig.oidc.scopes
      }
    });
  }

  async authenticate() {
    await this.oktaSignin.remove();
    await this.oktaSignin.showSignIn({
      el: '#okta-sign-in-widget'
      }).then((res: { tokens: any; }) => {
        // properly authenticated
        this.oktaSignin.authClient.handleLoginRedirect(res.tokens);
        // console.log(res);
        this.oktaAuth.signInWithRedirect();
      }).catch((err: any) => {
        throw err;
    });
  }
}
