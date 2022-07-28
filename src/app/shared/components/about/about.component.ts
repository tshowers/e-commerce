import { Component, OnInit, Input } from '@angular/core';
import { ColorsService } from '../../services/colors.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() data: any;

  constructor(public colorService: ColorsService) { }

  ngOnInit(): void {
  }

}
