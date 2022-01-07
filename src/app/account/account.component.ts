import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from './user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    console.log(form.valid, form.invalid);
    if (!form.value.email) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter a Valid Email',
      });
    } else if (!form.value.password || form.invalid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter Valid Password',
      });
    }
    if (form.valid && form.value.email && form.value.password) {
      const data = { email: form.value.email, password: form.value.password };
      this.userService.userLogin(data).subscribe((res) => {
        if (res.user == null) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${res.message}`,
          });
        }
        this.router.navigate([`user/${res.user[0]._id}`]);
      });
    }
  }

  onSignup() {
    this.dialogRef.close();
    this.router.navigate(['user/signup']);
  }
}
