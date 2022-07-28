import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './home/page/page.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { ThankYouComponent } from './home/thank-you/thank-you.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'home', component: PageComponent, data: { title: 'Home' } },
  { path: 'thank-you', component: ThankYouComponent, data: { title: 'Thank You' } },
  { path: 'activate', loadChildren: () => import('./activation/activation.module').then(m => m.ActivationModule), canLoad: [AuthGuard] },
  { path: 'my', loadChildren: () => import('./my/my.module').then(m => m.MyModule), canLoad: [AuthGuard] },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canLoad: [AuthGuard] },
  { path: 'carts', loadChildren: () => import('./carts/carts.module').then(m => m.CartsModule), canLoad: [AuthGuard] },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canLoad: [AuthGuard] },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canLoad: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canLoad: [AuthGuard] },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
