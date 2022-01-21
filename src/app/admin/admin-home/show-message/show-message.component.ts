import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.scss'],
})
export class ShowMessageComponent implements OnInit {
  messages = [];
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.adminService.getMessage().subscribe((res) => {
      if (res.contact) {
        this.messages = res.contact;
      }
    });
  }

  deleteMessage(id: string) {
    this.adminService.deleteMessage(id).subscribe((res) => {
      if (res.message === 'Deleted Successfully!') {
        this.messageService.add({
          severity: 'success',
          summary: 'Message Deleted!',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: `${res.message}`,
        });
      }
      return this.adminService.getMessage().subscribe((res) => {
        if (res.contact) {
          this.messages = res.contact;
        }
      });
    });
  }

  goBack() {
    this.location.back();
  }
}
