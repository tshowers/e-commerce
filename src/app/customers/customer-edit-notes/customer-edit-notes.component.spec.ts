import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditNotesComponent } from './customer-edit-notes.component';

describe('CustomerEditNotesComponent', () => {
  let component: CustomerEditNotesComponent;
  let fixture: ComponentFixture<CustomerEditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEditNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
