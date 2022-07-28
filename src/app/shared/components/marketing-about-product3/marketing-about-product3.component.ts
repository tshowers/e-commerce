import { Component, OnInit, Input } from '@angular/core';
import { ColorsService } from '../../services/colors.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-marketing-about-product3',
  templateUrl: './marketing-about-product3.component.html',
  styleUrls: ['./marketing-about-product3.component.css']
})
export class MarketingAboutProduct3Component implements OnInit {

  @Input() data: any;
  @Input() background = '#000000';
  color_block: any;


  constructor(public userService: UserService, public colorService: ColorsService) { }

  ngOnInit(): void {
    this.color_block = ColorsService.hexToRGBByPercent(this.background, 0.04);

  }

}
