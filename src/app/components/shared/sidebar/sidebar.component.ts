import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/interfaces/report';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  title: string = "GharDailo";
  showAddUser: boolean = false;
  subscription?: Subscription;
  reportDetail: Report[] = []

  constructor(private uiService: UiService, private reportService: ReportService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddUser = value);
   }

  ngOnInit(): void {
    this.getReport();
  }

  toggleAddUser() {
    this.uiService.toggleAddUser();
  }
  getReport(): void {
    this.reportService.getReports().subscribe((reports) => {
      this.reportDetail = reports.filter((report) => report["bill"] === false) as Report[]
    });
  }
}
