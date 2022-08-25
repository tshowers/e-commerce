import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreRoutingModule } from './store-routing.module';
import { PageComponent } from './page/page.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { StoreComponent } from './store/store.component';
import { YourStoreUnderConstructionComponent } from './your-store-under-construction/your-store-under-construction.component';
import { SetupRequiredComponent } from './setup-required/setup-required.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    PageComponent,
    UnderConstructionComponent,
    StoreComponent,
    YourStoreUnderConstructionComponent,
    SetupRequiredComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
