import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCheckOutComponent } from './medical-check-out.component';

describe('MedicalCheckOutComponent', () => {
  let component: MedicalCheckOutComponent;
  let fixture: ComponentFixture<MedicalCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalCheckOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
