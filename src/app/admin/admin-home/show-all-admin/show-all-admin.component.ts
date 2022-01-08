import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from '../../admin.model';
import { AdminService } from '../../admin.service';
import { DeleteAdminDialogComponent } from './delete-admin-dialog/delete-admin-dialog.component';
import { EditAdminDialogComponent } from './edit-admin-dialog/edit-admin-dialog.component';

@Component({
  selector: 'app-show-all-admin',
  templateUrl: './show-all-admin.component.html',
  styleUrls: ['./show-all-admin.component.scss'],
})
export class ShowAllAdminComponent implements OnInit, OnDestroy {
  admins: Admin[];
  id: string;
  private adminSubscription: Subscription;
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService.getAllAdmins();
    this.adminSubscription = this.adminService
      .getAdminUpdated()
      .subscribe((res) => {
        this.admins = res.admins;
      });
  }

  editAdmin(id: string) {
    this.dialog.open(EditAdminDialogComponent, {
      width: '550px',
      height: '550px',
    });
  }

  deleteAdmin(id: string) {
    this.dialog.open(DeleteAdminDialogComponent, {
      width: '350px',
    });
  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe;
  }
}
