import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { DataHandlerComponent } from 'src/app/shared/components/data-handler/data-handler.component';
import { ColorsService } from 'src/app/shared/services/colors.service';

@Component({
  selector: 'app-cc-info',
  templateUrl: './cc-info.component.html',
  styleUrls: ['./cc-info.component.css']
})
export class CcInfoComponent extends DataHandlerComponent implements OnInit {

  constructor(protected _dataService: DataService, public colorService: ColorsService) { 
    super(_dataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmit() : void {
    super.onSetByUID(environment.USERS);
  }

  showContent() : void {
    let cc_number = document.getElementById("cc_number")
    let type = cc_number?.getAttribute('type') === 'password' ? 'text' : 'password';
    cc_number?.setAttribute('type', type);
  }


}
