import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/interfaces/task';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  @Input() taskId?: string;
  @Output() onAddReport: EventEmitter<Report> = new EventEmitter<Report>();

  addReportForm: FormGroup = new FormGroup({});
  usersParsed: User[] = [];
  tasks?: Task[];
  taskClient: string = '';
  team = '';
  users?: string[];
  user = '';
  usersFiltered: User[] = [];
  clonedUsers: User[] = [];
  // Configurating AngularEditor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Describe here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
  };

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTaskAndClient();
    this.initializeForm();
    //Get the name from the users (the name for the select in HTML)
    this.userService.getUsersFromFireBase().subscribe((users) => {
      let uss = users;
      this.users = uss.map((el) => `${el["name"]}`);
    });
  }

  initializeForm(): void {
    this.addReportForm = this.fb.group({
      taskAndClient: "",
      date: ["", Validators.required],
      team: ["", [Validators.required, Validators.minLength(3)]],
      usersAssigned: [],
      description: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    const newReport = {
      taskAndClient: this.taskClient,
      date: this.addReportForm.value.date,
      team: this.addReportForm.value.team,
      userAssigned: this.addReportForm.value.userAssigned,
      userBalance: this.usersFiltered,
      description: this.addReportForm.value.description,
      taskId: this.taskId,
      bill: false,
    };
    this.getAllUsersBalance(this.usersFiltered);

    this.onAddReport.emit(newReport);
    this.addReportForm.reset();
    for(let control in this.addReportForm.controls) {
      this.addReportForm.controls[control].setErrors(null);
    }
  }
  // Get as args the old user and the new ones,
  // the service's method will make necessary calculations and update the Firestore
  updateUsers(user: User, newUser: User): void {
    this.userService.updateUserFromFirebase(user, newUser);
  }

  // Get all the users from Firebase
  getUsers(){
    this.userService.getUsersFromFireBase().subscribe((users)=> (this.usersParsed = users as User[])
    )
  }

  /* This method is used to get the task and the client
  The id of the task will come from the @Input taskId;
  This will be added in the report */
  getTaskAndClient() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.filter((task) => {
        task["id"] === this.taskId;
      }) as Task[];
      this.taskClient = `${tasks[0]["client"]} : ${tasks[0]["title"]}`;
    });
  }

  /* This method uses the usersFiltered as arg
  and compares the ids of the 'old user' and 'new user' (to update balance)
  and will call this.updateUsers with these 2 args */
  getAllUsersBalance(oldUsers: User[]) {
    for(let i=0; i< oldUsers.length; i++) {
      for (let j=0; j<this.clonedUsers.length; j++) {
        if(this.usersFiltered[i].id === this.clonedUsers[j].id) {
          this.updateUsers(
            this.clonedUsers[j],
            this.usersFiltered[i]
          );
        }
      }
    }
  }

  /* This method is making a clone of the users we get from the Firestore
  the clone is not a reference to the same object, but to a new object 
  that is the same as usersParsed

  After that is filtering the users and populating the usersFiltered
  with the users we pick in the form. */

  filterUsers(){
    this.clonedUsers = this.usersParsed.map((obj) => {
      return { ...obj};
    });
    this.usersParsed.forEach((user)=> {
      if(this.addReportForm.value.userAssigned.includes(user.name)) {
        this.usersFiltered.push(user);
      }
    });
  }
}
