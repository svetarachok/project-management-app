import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Board } from '../../models/board.interface';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss'],
})
export class AssignUsersComponent implements OnInit, OnDestroy {
  userId: string = '';

  assignUsersForm!: FormGroup;

  restUsers: User[] = [];

  userSubscription!: Subscription;

  constructor(
    @Inject(DIALOG_DATA) public data: { board: Board; existingUsers: User[] },
    public dialogRef: DialogRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.data.board.owner;
    this.userSubscription = this.userService
      .getUsers()
      .subscribe(
        users =>
          (this.restUsers = users.filter(
            user => !this.data.board.users.includes(user._id)
          ))
      );
    this.createAssignUserForm();
  }

  get usersSelect() {
    return this.assignUsersForm.get('usersSelect');
  }

  createAssignUserForm() {
    this.assignUsersForm = new FormGroup({
      usersSelect: new FormControl(''),
    });
  }

  onAssignUserToBoardClick() {
    console.log();
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
