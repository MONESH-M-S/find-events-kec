import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from 'src/app/account/account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  visibleSidebar: boolean = false;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  showLoginDialog() {
    this.dialog.open(AccountComponent, {
      width: '450px',
    });
  }
}
