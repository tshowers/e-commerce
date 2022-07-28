import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';
import { DataHandlerComponent } from 'src/app/shared/components/data-handler/data-handler.component';
import { ColorsService } from 'src/app/shared/services/colors.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent extends DataHandlerComponent implements OnInit {

  constructor(protected _dataService: DataService, public colorService: ColorsService) {
    super(_dataService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmit(): void {
    if (this.data.user_type == 'patient') {
      this.data.practitioner_name = '';
      this.data.npi = '';
      this.data.customer_id = '';
      this.data.prac_first_name = '';
      this.data.prac_last_name = '';
      super.onSetByUID(environment.USERS);
    } else {
      if ((this.data.practitioner_name && this.data.practitioner_name != '')
        && (this.data.customer_id && this.data.customer_id != ''))
        super.onSetByUID(environment.USERS);
    }
  }


}
