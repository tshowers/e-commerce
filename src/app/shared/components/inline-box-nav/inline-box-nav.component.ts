import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-inline-box-nav',
  templateUrl: './inline-box-nav.component.html',
  styleUrls: ['./inline-box-nav.component.css']
})
export class InlineBoxNavComponent implements OnInit {

  @Input() data: any;
  @Input() isHome: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() isSignIn: boolean = false;
  @Input() color = '#000000';
  @Input() isSpecialHome : boolean = false;

  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.admin$.subscribe((result) => {
      this.isAdmin = result.valueOf();
    });

  }

}
