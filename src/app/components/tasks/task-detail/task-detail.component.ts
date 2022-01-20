import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskSearchPipe } from '../task-search.pipe';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskDetail?: Task;
  @Input() task?: Task;

  constructor(
        private route: ActivatedRoute,
    private taskService: TasksService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  // Gets the project from the firestore and filters to match the id from the URL
  getTask(): void {
    const id = String(this.route.snapshot.paramMap.get("id"));
    this.taskService.getTasks().subscribe((tasks) => 
    (this.taskDetail = tasks.find((p) => p['id'] === id) as Task));
  }

  // These two methods check the ourte URL and based on the URL
  // using ngIf in the template will display the result if we
  // are on the page with all the tasks or on the page
  // for only one task
  hasRoute(route: string) {
    return this.router.url === route;
  }
  hasRouteDetail(route: string) {
    return this.router.url  !== route;
  }
}
