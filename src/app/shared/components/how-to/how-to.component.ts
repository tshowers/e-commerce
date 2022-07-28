import { Component, OnInit, Input } from '@angular/core';
import { ColorsService } from '../../services/colors.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})
export class HowToComponent implements OnInit {

  @Input() data: any;
  @Input() background = '#000000';
  color_block: any;


  constructor(public userService: UserService, public colorService: ColorsService) { }

  ngOnInit(): void {
    this.color_block = "#ffffff";
  }

}
