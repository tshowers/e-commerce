import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';

import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerEditNameComponent } from './customer-edit-name/customer-edit-name.component';
import { CustomerEditTypeComponent } from './customer-edit-type/customer-edit-type.component';
import { CustomerEditEmailComponent } from './customer-edit-email/customer-edit-email.component';
import { CustomerEditTitleComponent } from './customer-edit-title/customer-edit-title.component';
import { CustomerEditReferredComponent } from './customer-edit-referred/customer-edit-referred.component';
import { CustomerEditAddressComponent } from './customer-edit-address/customer-edit-address.component';
import { CustomerEditNotesComponent } from './customer-edit-notes/customer-edit-notes.component';
import { CustomerEditMarketingComponent } from './customer-edit-marketing/customer-edit-marketing.component';
import { CustomerEditPhoneComponent } from './customer-edit-phone/customer-edit-phone.component';
import { CustomerEditStatusComponent } from './customer-edit-status/customer-edit-status.component';
import { CustomerEditPersonalComponent } from './customer-edit-personal/customer-edit-personal.component';
import { CustomerEditCreditComponent } from './customer-edit-credit/customer-edit-credit.component';
import { CustomerEditGenderComponent } from './customer-edit-gender/customer-edit-gender.component';
import { CustomerEditDobComponent } from './customer-edit-dob/customer-edit-dob.component';



@NgModule({
  declarations: [HomeComponent, CustomerListComponent, CustomerViewComponent,
    CustomerEditNameComponent,
    CustomerEditTypeComponent,
    CustomerEditEmailComponent,
    CustomerEditTitleComponent,
    CustomerEditReferredComponent,
    CustomerEditAddressComponent,
    CustomerEditNotesComponent,
    CustomerEditMarketingComponent,
    CustomerEditPhoneComponent,
    CustomerEditStatusComponent,
    CustomerEditPersonalComponent,
    CustomerEditCreditComponent,
    CustomerEditGenderComponent,
    CustomerEditDobComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
