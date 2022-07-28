import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditEmailComponent } from './customer-edit-email.component';

describe('CustomerEditEmailComponent', () => {
  let component: CustomerEditEmailComponent;
  let fixture: ComponentFixture<CustomerEditEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
