import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../admin.model';
import { AdminService } from '../admin.service';
import { AddAdminDialogComponent } from './add-admin-dialog/add-admin-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  id: string;
  isAdmin: boolean = false;
  adminDetails: Admin;
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.adminService.getAdminDetailById(this.id).subscribe((res) => {
          if (res.admin !== null) {
            this.isAdmin = res.admin[0].isAdmin;
            this.adminDetails = res.admin[0];
          }
        });
      }
    });
  }

  showAdminAddDialog() {
    this.dialog.open(AddAdminDialogComponent, {
      width: '450px',
      data: { id: this.id },
    });
  }

  showAllAdminDialog() {}
}
