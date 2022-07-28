import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DataHandlerComponent } from 'src/app/shared/components/data-handler/data-handler.component';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ColorsService } from '../../services/colors.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-micro-check-out',
  templateUrl: './micro-check-out.component.html',
  styleUrls: ['./micro-check-out.component.css']
})
export class MicroCheckOutComponent extends DataHandlerComponent implements OnInit, OnDestroy {

  @Input() companyData: any;
  public diagnostic: boolean = false;
  public check_out: any = {
    user_type: 'employer',
    billing_shipping: true,
    prac_pay: 'employer',
    delivery_time: 'No',
    terms_of_service: false,
    billing_country: '',
    billing_province: ''

  };
  public errorMessage: any;
  public production: boolean;
  private _errorSubscription?: Subscription;

  constructor(protected _dataService: DataService, private _router: Router, public cartService: CartService, public colorService: ColorsService, public userService: UserService, private _checkoutService: CheckoutService) {
    super(_dataService);
    this.production = environment.production;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setAutoFill();
    this._errorSubscription = this._checkoutService.errorMessage.subscribe((message) => {
      this.errorMessage = message;
    })
  }

  ngOnDestroy(): void {
    if (this._errorSubscription)
      this._errorSubscription.unsubscribe();  
  }

  setAutoFill(): void {
    setTimeout(() => {
      this.cartService.initCheckOutBasedOnUser(this.check_out, false);
    }, 1000);
  }


  onSubmit(): void {
    this._checkoutService.processOrder(this.check_out);
  }

  showContent() : void {
    let cc_number = document.getElementById("cc_number")
    let type = cc_number?.getAttribute('type') === 'password' ? 'text' : 'password';
    cc_number?.setAttribute('type', type);
  }


  // Used by other components
  public refresh(): void {
    this.cartService.refreshScreen(this.check_out);
  }

  setDiagnostic(): void {
    this.diagnostic = !this.diagnostic;
  }
}
