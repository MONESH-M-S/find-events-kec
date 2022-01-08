import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from '../../admin.model';
import { AdminService } from '../../admin.service';
import { AddAdminDialogComponent } from '../add-admin-dialog/add-admin-dialog.component';
import { DeleteAdminDialogComponent } from './delete-admin-dialog/delete-admin-dialog.component';

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
    private dialog: MatDialog,
    private location: Location
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

  deleteAdmin(id: string) {
    let dialogRef = this.dialog.open(DeleteAdminDialogComponent, {
      width: '350px',
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.adminService.getAllAdmins();
    });
  }

  showAdminAddDialog() {
    let dialogRef = this.dialog.open(AddAdminDialogComponent, {
      width: '450px',
      data: { id: this.id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.adminService.getAllAdmins();
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.adminSubscription.unsubscribe;
  }
}
