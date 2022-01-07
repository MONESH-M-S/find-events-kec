import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-admin-dialog',
  templateUrl: './add-admin-dialog.component.html',
  styleUrls: ['./add-admin-dialog.component.scss'],
})
export class AddAdminDialogComponent implements OnInit {
  form: FormGroup;
  id: string;
  constructor(
    private dialogRef: MatDialogRef<AddAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.id = this.data.id;
      this._initForm();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitForm() {
    if (this.form.invalid) {
      return;
    }
    const f = this.form.value;
    const data = {
      name: f.name,
      email: f.email,
      password: f.password,
      department: f.department,
      isAdmin: f.isAdmin,
    };
    this.adminService.adminSignup(data).subscribe((res) => {
      if (res.admin === null) {
        this.dialogRef.close();
        return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${res.message}`,
        });
      }
      this.dialogRef.close();
      return this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Admin Created!`,
      });
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: ['', [Validators.required]],
      isAdmin: [false, [Validators.required]],
      creator: [this.id],
    });
  }
}
