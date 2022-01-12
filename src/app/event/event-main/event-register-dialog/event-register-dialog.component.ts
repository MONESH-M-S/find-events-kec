import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SoloComponent } from './solo/solo.component';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-event-register-dialog',
  templateUrl: './event-register-dialog.component.html',
  styleUrls: ['./event-register-dialog.component.scss'],
})
export class EventRegisterDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EventRegisterDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      name: string;
    }
  ) {}

  ngOnInit(): void {}

  onClickedSoloEvent() {
    this.dialogRef.close();
    const name = this.data.name;
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: name,
      },
    };
    this.dialog.open(SoloComponent, dialogBoxSettings);
  }

  onClickedTeamEvent() {
    this.dialogRef.close();
    const name = this.data.name;
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        name: name,
      },
    };
    this.dialog.open(TeamComponent, dialogBoxSettings);
  }
}
