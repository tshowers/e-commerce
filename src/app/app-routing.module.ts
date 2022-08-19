import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageComponent } from './home/page/page.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { ThankYouComponent } from './home/thank-you/thank-you.component';
import { UnderConstructionComponent } from './home/under-construction/under-construction.component';
import { YourStoreUnderConstructionComponent } from './home/your-store-under-construction/your-store-under-construction.component';
import { SetupRequiredComponent } from './home/setup-required/setup-required.component';

import { StoreComponent } from './home/store/store.component';
import { AuthGuard } from './shared/services/auth.guard';
import { StoreViewResolverService } from './shared/services/store-view-resolver.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'store', component: PageComponent, data: { title: 'Store Home' } },
  { path: 'store-under-construction', component: YourStoreUnderConstructionComponent, data: { title: 'Store Under Construction' } },
  { path: 'setup-required', component: SetupRequiredComponent, data: { title: 'Setup Required' } },
  { path: 'thank-you', component: ThankYouComponent, data: { title: 'Thank You' } },
  { path: 'under-construction', component: UnderConstructionComponent, data: { title: 'Under Construction' } },
  { path: 'identity', loadChildren: () => import('./identity/identity.module').then(m => m.IdentityModule) },
  { path: 'activate', loadChildren: () => import('./activation/activation.module').then(m => m.ActivationModule), canLoad: [AuthGuard] },
  { path: 'my', loadChildren: () => import('./my/my.module').then(m => m.MyModule), canLoad: [AuthGuard] },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canLoad: [AuthGuard] },
  { path: 'carts', loadChildren: () => import('./carts/carts.module').then(m => m.CartsModule), canLoad: [AuthGuard] },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canLoad: [AuthGuard] },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canLoad: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canLoad: [AuthGuard] },
  { path: 'error', component: NotFoundComponent, data: { title: 'Error Found' } },
  { path: 'store/:id', component: StoreComponent, data: { title: 'Store' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StoreViewResolverService]
})
export class AppRoutingModule { }
