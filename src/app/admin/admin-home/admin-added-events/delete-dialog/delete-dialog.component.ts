import { Component, Inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {}

  onDeleteClicked() {
    this.adminService.deleteEvent(this.data.id).subscribe((res) => {
      if (res.message == "Event Deleted Successfully") {
        this.adminService
          .deleteEventRegistration(this.data.id)
          .subscribe((res) => {
            if (res.message == "Deleted Successfully!") {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Deleted Successfully!',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Deleting Event Failed!',
              });
            }
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deleted Successfully!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Deleting Event Failed!',
        });
      }
    });
  }
}
