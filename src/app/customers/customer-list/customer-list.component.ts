import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  @Output() id = new EventEmitter();
  loading: any;
  private _dataSubscription?: Subscription;
  data: any;
  filteredData = '';


  constructor(public userService: UserService) {
    this.userService.getAll();
  }

  ngOnInit(): void {
    this._dataSubscription = this.userService.items?.subscribe((data) => {
      this.data = data;
      this.loading = 'complete'
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
