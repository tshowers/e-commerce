import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { ColorsService } from 'src/app/shared/services/colors.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-start',
  templateUrl: './admin-start.component.html',
  styleUrls: ['./admin-start.component.css']
})
export class AdminStartComponent implements OnInit {

  public production: boolean;
  public isAdmin: boolean = false;

  constructor(private _location: Location, public userService: UserService, public colorService: ColorsService) { 
    this.production = environment.production;
  }

  ngOnInit(): void {
    this.userService.admin$.subscribe((result) => {
      this.isAdmin = result.valueOf();
    });

  }

  back(): void {
    this._location.back()
  }

}
