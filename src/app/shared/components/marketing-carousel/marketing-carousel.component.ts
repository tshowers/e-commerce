import { Component, OnInit, Input } from '@angular/core';
import { ColorsService } from '../../services/colors.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-marketing-carousel',
  templateUrl: './marketing-carousel.component.html',
  styleUrls: ['./marketing-carousel.component.css']
})
export class MarketingCarouselComponent implements OnInit {

  @Input() data: any;
  @Input() background = '#000000';
  color_block: any;

  constructor(public userService: UserService, public colorService: ColorsService) { }

  ngOnInit(): void {
    this.color_block = ColorsService.hexToRGBByPercent(this.background, 0.08);
  }

}
