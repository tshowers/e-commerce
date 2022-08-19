import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ColorsService } from 'src/app/shared/services/colors.service';
import { environment } from 'src/environments/environment';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Output() id = new EventEmitter();
  private _dataSubscription?: Subscription;
  public filteredData = '';
  public data: any;
  public production = environment.production;

  public isInsurancePartner: boolean = false;
  public isAdmin: boolean = false;

  constructor(private _location: Location, public orderService: OrderService, public userService: UserService, public colorService: ColorsService, public settingService: SettingService) {
    this.userService.insurancePartner$.subscribe((result) => {
      this.isInsurancePartner = result.valueOf();
    });

    this.userService.admin$.subscribe((result) => {
      this.isAdmin = result.valueOf();
    });
  }

  ngOnInit(): void {
    if (!environment.production)
    console.log("User is a ", this.userService.user?.temp.userType, this.userService.user, "Admin", this.isAdmin, "Partner", this.isInsurancePartner);

    if (this.isInsurancePartner && !this.isAdmin)
      this.orderService.getInsuranceRelated();
    else if (this.userService.user && this.userService.user.temp.userType && (this.userService.user.temp.userType == 'practitioner'))
      this.orderService.getAllByPrac(this.userService.user?.temp.customerId);
    else
      this.orderService.getAllByUser(this.userService.user?._id);
  }

  back(): void {
    this._location.back()
  }

  public onView(value: any): void {
    this.data = value;
  }

  public onClose(event: any): void {
    this.data = undefined;
  }


}
