import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @Input() taskId?: string;
  reports: Report[] = [];
  tasks?: string[];
  taskClient: string = "";
  team = "";
  users?: string[];
  user = "";

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReports().subscribe((reports)=>(
      this.reports = reports as Report[]
    ))
  }

  addReport(report: Report) {
    this.reportService.addReport(report);
  }

}
