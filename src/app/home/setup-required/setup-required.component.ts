import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-setup-required',
  templateUrl: './setup-required.component.html',
  styleUrls: ['./setup-required.component.css']
})
export class SetupRequiredComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
