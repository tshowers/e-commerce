import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroCheckOutComponent } from './micro-check-out.component';

describe('MicroCheckOutComponent', () => {
  let component: MicroCheckOutComponent;
  let fixture: ComponentFixture<MicroCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroCheckOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
