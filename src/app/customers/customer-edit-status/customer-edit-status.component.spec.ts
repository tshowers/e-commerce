import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditStatusComponent } from './customer-edit-status.component';

describe('CustomerEditStatusComponent', () => {
  let component: CustomerEditStatusComponent;
  let fixture: ComponentFixture<CustomerEditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
