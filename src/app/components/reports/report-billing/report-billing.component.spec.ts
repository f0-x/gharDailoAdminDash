import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBillingComponent } from './report-billing.component';

describe('ReportBillingComponent', () => {
  let component: ReportBillingComponent;
  let fixture: ComponentFixture<ReportBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
