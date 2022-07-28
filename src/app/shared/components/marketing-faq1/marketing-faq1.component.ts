import { Component, OnInit, Input } from '@angular/core';
import { ColorsService } from '../../services/colors.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-marketing-faq1',
  templateUrl: './marketing-faq1.component.html',
  styleUrls: ['./marketing-faq1.component.css']
})
export class MarketingFaq1Component implements OnInit {

  @Input() data: any;
  @Input() background = '#000000';
  color_block: any;

  constructor(public userService: UserService, public colorService: ColorsService) { }

  ngOnInit(): void {
    this.color_block = ColorsService.hexToRGBByPercent(this.background, 0.08);
  }

}
