import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.close();
  }

  onDeleteUser() {
    if (this.data) {
      this.userService.deleteUser(this.data.id).subscribe((res) => {
        if (res.user === null) {
          this.dialogRef.close();
          return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Deleting User Failed',
          });
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User Deleted Successfully!',
        });
        this.router.navigate(['/']);
      });
    }
    this.dialogRef.close();
  }
}
