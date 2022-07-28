import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-saved-carts-list',
  templateUrl: './saved-carts-list.component.html',
  styleUrls: ['./saved-carts-list.component.css']
})
export class SavedCartsListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  private _dataSubscription?: Subscription;
  public filteredData = '';
  loading: any;
  prac: string;
  public production: boolean;

  constructor(public cartService: CartService, private _userService: UserService) {
    this.production = environment.production;

    this.prac = (this._userService.user && this._userService.user.customer_id) ? this._userService.user.customer_id : "";

    if (!this.production)
      console.log("Practitioner", this.prac)

    if (this.prac && (this.prac != '')) {
      if (!this.production)
        console.log("Getting saved carts for ", this.prac)
      this.cartService.getAllPracSavedCarts(this.prac);
    }
    else {
      if (!this.production)
        console.log("Getting all saved carts");
      this.cartService.getAllSavedCarts();
    }
  }

  ngOnInit(): void {
    this._dataSubscription = this.cartService.items?.subscribe((data) => {
      if (data && data.length)  
      this.loading =  'complete';
    })

  }

  ngOnDestroy(): void {
    if (this._dataSubscription)
      this._dataSubscription.unsubscribe();
  }

  public onView(value: any): void {
    this.id.emit(value);
  }

}
