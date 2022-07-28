import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditPhoneComponent } from './customer-edit-phone.component';

describe('CustomerEditPhoneComponent', () => {
  let component: CustomerEditPhoneComponent;
  let fixture: ComponentFixture<CustomerEditPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
