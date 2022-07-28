import { Component, OnInit, OnDestroy, Output,  EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';

import { DataService } from 'src/app/shared/services/data.service';
import { DataHandlerComponent } from 'src/app/shared/components/data-handler/data-handler.component';

import { environment } from "../../../environments/environment";
import { ColorsService } from 'src/app/shared/services/colors.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-lab-order-summary',
  templateUrl: './lab-order-summary.component.html',
  styleUrls: ['./lab-order-summary.component.css']
})
export class LabOrderSummaryComponent  extends DataHandlerComponent implements OnInit, OnDestroy {

  @Output() goBack = new EventEmitter();
  @Input() allDataEntered: boolean = false;
  isMe: boolean = false;

  constructor(private _location: Location, protected _dataService: DataService, public colorService: ColorsService, private _userService: UserService) {
    super(_dataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.production)
      console.log("USER", this._userService.user);
  }

  onSubmit() : void {
    this.fillInProfile();
    super.onSubmit(environment.LAB_ORDERS);
  }

  ngOnDestroy(): void {

  }

  fillInProfile(): void {
    if (this._userService.user && this.isMe) {
      this._userService.user.first_name = this.data.first_name;
      this._userService.user.last_name = this.data.last_name;
      this._userService.user.address1 =  this.data.address1;
      this._userService.user.address2 =  this.data.address2;
      this._userService.user.city =  this.data.city;
      this._userService.user.province =  this.data.province;
      this._userService.user.zip =  this.data.zip;
      this._userService.user.gender =  this.data.gender;
      this._userService.user.dob =  this.data.dob;
      this._userService.user.email =  this.data.email;
      this._userService.user.phone_number =  this.data.phone;
    }
  }

  onLabOrder(): void {
    this.data.status = "Activated";
    this.onSubmit();
  }

  onOrderID(): void {
    this.goBack.emit('orderID');
  }

  onName(): void {
    this.goBack.emit('name');
  }

  onDob(): void {
    this.goBack.emit('dob');
  }

  onGender(): void {
    this.goBack.emit('gender');
  }

  onTimeCollected(): void {
    this.goBack.emit('collection-time');
  }

  onPhone(): void {
    this.goBack.emit('phone');
  }

  onKitNumber(): void {
    this.goBack.emit('kit-number');
  }

  onEmail(): void {
    this.goBack.emit('email');
  }

  onAddress(): void {
    this.goBack.emit('address');
  }

}
