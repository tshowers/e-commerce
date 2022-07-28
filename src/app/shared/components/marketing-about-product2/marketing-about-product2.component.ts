import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ColorsService } from '../../services/colors.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-marketing-about-product2',
  templateUrl: './marketing-about-product2.component.html',
  styleUrls: ['./marketing-about-product2.component.css']
})
export class MarketingAboutProduct2Component implements OnInit {

  @Input() data: any;
  @Input() background = '#000000';
  color_block: any;

  constructor(public router:Router, public userService: UserService, public colorService: ColorsService) { }

  ngOnInit(): void {
    this.color_block = ColorsService.hexToRGBByPercent(this.background, 0.04);

  }

}
