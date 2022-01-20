import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskName = "";
  tasks: Task[] = [];

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks)=> (this.tasks = tasks as Task[]));
  }
  // Will get the "task" from the EventEmitter in the AddTask component
  addTask(task: Task){
    this.taskService.addTask(task);
  }

}
