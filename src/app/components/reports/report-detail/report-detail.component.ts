import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
export class ReportDetailComponent implements OnInit {
  reportDetail: Report[] = [];
  @Input() taskId?: string;

  constructor(private route: ActivatedRoute, private reportService: ReportService) { }

  ngOnInit(): void {
  }

  getReport(): void {
    this.reportService.getReports().subscribe((reports)=>{
      this.reportDetail = reports.filter(
        (r) => r["taskId"] === this.taskId
      ) as Report[];
    });
  }

}
