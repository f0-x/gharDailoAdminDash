import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ActivatedRoute } from '@angular/router';
import { getNumberOfCurrencyDigits, Location } from '@angular/common';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-billing',
  templateUrl: './report-billing.component.html',
  styleUrls: ['./report-billing.component.css']
})
export class ReportBillingComponent implements OnInit {
  reportDetail: Report[] = [];
  numberLeft?: number;
  @Input() taskId? : string;
  @Output() onClick: EventEmitter<Report> = new EventEmitter();

  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReport();
  }
  getReport(): void {
    this.reportService.getReports().subscribe((reports) => {
      this.reportDetail =  reports as Report[];
    });


  }
    getNumber(): void {
      this.numberLeft = this.reportDetail.length
    }

    markAsFinished(report: Report): void {
      this.onClick.emit(report);
      this.reportService.updateReport(report);
    }

}
