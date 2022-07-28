import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ColorsService } from 'src/app/shared/services/colors.service';
import { environment } from 'src/environments/environment';

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

  constructor(private _location: Location, public orderService: OrderService, public userService: UserService, public colorService: ColorsService) {
    this.userService.insurancePartner$.subscribe((result) => {
      this.isInsurancePartner = result.valueOf();
    });

    this.userService.admin$.subscribe((result) => {
      this.isAdmin = result.valueOf();
    });
  }

  ngOnInit(): void {
    if (!this.production)
    console.log("User is a ", this.userService.user?.user_type, this.userService.user, "Admin", this.isAdmin, "Partner", this.isInsurancePartner);

    if (this.isInsurancePartner && !this.isAdmin)
      this.orderService.getInsuranceRelated();
    else if (this.userService.user && this.userService.user.user_type && (this.userService.user.user_type == 'practitioner'))
      this.orderService.getAllByPrac(this.userService.user?.customer_id);
    else
      this.orderService.getAllByUser(this.userService.user?.uid);
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
