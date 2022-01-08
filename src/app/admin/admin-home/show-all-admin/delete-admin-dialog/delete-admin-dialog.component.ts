import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-delete-admin-dialog',
  templateUrl: './delete-admin-dialog.component.html',
  styleUrls: ['./delete-admin-dialog.component.scss'],
})
export class DeleteAdminDialogComponent implements OnInit {
  id: string;
  constructor(
    private dialogRef: MatDialogRef<DeleteAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private messageService: MessageService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.id = this.data.id;
    }
  }

  onDelete() {
    this.adminService.deleteAdminById(this.id).subscribe((res) => {
      if (res.message === 'Deleted Successfully!') {
        return this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${res.message}`,
        });
      } else {
        return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${res.message}`,
        });
      }
    });
    this.dialogRef.close();
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
}
