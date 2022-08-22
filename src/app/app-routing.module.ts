// utilities
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// okta related
import { OktaAuthGuard } from '@okta/okta-angular';

// components
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';


// from the most specific to generic
// first match wins
const routes: Routes = [
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  {path: 'login', loadChildren: () => import('../app/components/login/login.module').then(m => m.LoginModule)},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
