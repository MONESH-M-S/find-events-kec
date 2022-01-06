import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AccountComponent } from 'src/app/account/account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  visibleSidebar: boolean = false;
  email?: string;
  password?: string;
  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  showLoginDialog() {
    let dialogRef = this.dialog.open(AccountComponent, {
      width: '450px',
      data: { email: this.email, password: this.password },
    });
  }
}
