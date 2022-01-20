import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderReportComponent } from './add-order-report.component';

describe('AddOrderReportComponent', () => {
  let component: AddOrderReportComponent;
  let fixture: ComponentFixture<AddOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
