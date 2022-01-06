import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    private router: Router
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
      this.router.navigate(['user/1']);
    }
  }
}
