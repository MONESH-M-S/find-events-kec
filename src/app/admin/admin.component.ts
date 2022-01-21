import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.adminService
      .adminLogin(form.value.email, form.value.password)
      .subscribe((res) => {
        if (res.admin === null) {
          return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${res.message}`,
          });
        }
        if (res.admin) {
          this.adminService.isAdmin = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Admin verified!`,
          });
          this.router.navigate([`admin/${res.admin[0]._id}`]);
        }
      });
    this.isLoading = false;
  }
}
