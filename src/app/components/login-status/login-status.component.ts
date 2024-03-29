import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage: Storage = sessionStorage;

  constructor(public authStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userFullName = userClaims.name as string;
      const email = userClaims.email as string;
      // console.log(`The user: ${userClaims.name} has logged in`);
      // console.log(`The user email: ${email}`);
      this.storage.setItem('userEmail', JSON.stringify(email));
    }
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.signOut();
  }

  async toLogin() {
    await this.router.navigate(['/login']);
  }

  async toMembers() {
    await this.router.navigate(['/members']);
  }

  async toOrderHistory() {
    await this.router.navigate(['/order-history']);
  }

}
