import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Report } from 'src/app/interfaces/report';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-order-report',
  templateUrl: './add-order-report.component.html',
  styleUrls: ['./add-order-report.component.css']
})
export class AddOrderReportComponent implements OnInit {
  @Input() orderId?: string;
  @Output() onAddReportOrder: EventEmitter<Report> = new EventEmitter();

  addReportOrderForm: FormGroup = new FormGroup({});
  usersParsed: User[] = [];
  orders?: Order[];
  taskClient?: string;
  team = "";
  users?: string[];
  user = "";
  usersFiltered: User[] = [];
  clonedUsers: User[] = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Describe the project...",
    translate: "no",
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']]
  };

  constructor(private fb: FormBuilder, private userService: UserService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getClient();
    this.initializeForm();
    this.userService.getUsersFromFireBase().subscribe((users)=>{
      let uss = users;
      this.users = uss.map((el) => `${el["text"]}`);
    });
  }

  initializeForm(): void {
    this.addReportOrderForm = this.fb.group({
      date: ["", Validators.required],
      team: ["", Validators.required],
      usersAssigned: [],
      description: ""
    });
  }

  onSubmit() {
    const newReport = {
      taskAndClient: this.taskClient,
      date: this.addReportOrderForm.value.date,
      team: this.addReportOrderForm.value.team,
      usersAssigned: this.addReportOrderForm.value.usersAssigned,
      usersBalance: this.usersFiltered,
      description: this.addReportOrderForm.value.description,
      orderId: this.orderId,
      bill: false
    };
    this.getAllUsersBalance(this.usersFiltered);

    this.onAddReportOrder.emit(newReport);
    this.addReportOrderForm.reset();
    for(let control in this.addReportOrderForm.controls) {
      this.addReportOrderForm.controls[control].setErrors(null);
    }
  }

  updateUsers(user: User, newUser: User): void {
    this.userService.updateUserFromFirebase(user, newUser);
  }

  reloadPage() {
    window.location.reload();
  }

  getUsers() {
    this.userService.getUsersFromFireBase().subscribe((users)=> (this.usersParsed = users as User[]));
  }

  getClient() {
    this.orderService.getOrders().subscribe((orders)=>{
      let order = orders.find((o) => o["id"] === this.orderId)
      this.taskClient = order?.["client"]
    })
  }

  getAllUsersBalance(old: User[]) {
    for(let i=0; i<old.length; i++) {
      for(let j=0; j< this.clonedUsers.length; j++) {
        if(this.usersFiltered[i].id === this.clonedUsers[j].id){
          this.updateUsers(
            this.clonedUsers[j],
            this.usersFiltered[i]
          );
        }
      }
    }
  }

  filterUsers() {
    this.clonedUsers = this.usersParsed.map((obj) => {
      return {...obj};
    });
    this.usersParsed.forEach((user) => {
      if(this.addReportOrderForm.value.usersAssigned.includes(user.name)) {
        this.usersFiltered.push(user);
      }
    });
  }
}
