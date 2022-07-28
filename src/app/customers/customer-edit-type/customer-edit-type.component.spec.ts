import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditTypeComponent } from './customer-edit-type.component';

describe('CustomerEditTypeComponent', () => {
  let component: CustomerEditTypeComponent;
  let fixture: ComponentFixture<CustomerEditTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
