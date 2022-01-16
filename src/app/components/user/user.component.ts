import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userName: string = "";
  users: User[] = [];
  editMode = false;
  editId = "";

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getUsersFromFireBase().subscribe((users) => {
      this.users = users as User[];
    });

  }
    // Get the user as ($event) from the emitter in Add User Component
    // ANd user UserService to add user to FireStore
    addUserToFirebase(user: User) {
      this.userService.addUsertoFireBase(user);
    }

    // Open a dialog box with the contents in DeleteUserComponent
    // Send the data using MAT_DIALOG_DATA TO DeleteUserComponent
    openDialog(user: User) {
      this.dialog.open(DeleteUserComponent, {
        data: {
          user: user,
        }
      });
    }

    editUserFromFirebase(user: User) {
      this.userService.editUserFromFirebase(user);
    }

    enterEditMode(id: string) {
      console.log(id);
      this.editId = id;
      this.editMode = true;
    }

    compareId(id: string, editId: string): boolean {
      return id === editId;
    }

    exitEditMode(user: User): void {
      console.log(user);
      this.editUserFromFirebase(user);
      this.editMode = false;
    }

}
