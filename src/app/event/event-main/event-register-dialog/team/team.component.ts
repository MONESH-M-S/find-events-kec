import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<TeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {name: string}
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
