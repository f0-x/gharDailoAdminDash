import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter<Task>();
  addTaskForm: FormGroup = new FormGroup({});
  statusType = ['Started', 'In Progress', 'Finished'];
  //Configurating AngularEditor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Describe...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      client: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  // This method submits the task to Firebase using
  // Eventemitter to the Tasks component
  onSubmit() {
    const newTask = {
      title: this.addTaskForm.value.title,
      client: this.addTaskForm.value.client,
      location: this.addTaskForm.value.location,
      status: this.addTaskForm.value.status,
      date: this.addTaskForm.value.date,
      description: this.addTaskForm.value.description,
    };
    this.onAddTask.emit(newTask);

    this.addTaskForm.reset();
    for (let control in this.addTaskForm.controls) {
      this.addTaskForm.controls[control].setErrors(null);
    }
  }
}
