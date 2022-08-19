// utility modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// okta tools
import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

// component and config
import { LoginComponent } from "./login.component";
import myAppConfig from 'src/app/config/my-app-config';

const config = {
  issuer: myAppConfig.oidc.issuer,
  clientId: myAppConfig.oidc.clientId,
  redirectUri: myAppConfig.oidc.redirectUri,
  scopes: myAppConfig.oidc.scopes,
};

const oktaAuth = new OktaAuth(config);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    OktaAuthModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
  ],
  exports: [LoginComponent]
})
export class LoginModule {}