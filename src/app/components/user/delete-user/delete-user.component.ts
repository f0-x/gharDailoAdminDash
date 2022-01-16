import { Component, Inject, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: DialogUser) { }

  ngOnInit(): void {}
  deleteUserFromFirebase(user: User) {
    this.userService.deleteUserFromFirebBase(user);
  }
}

export interface DialogUser {
  user: User;
}
