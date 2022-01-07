import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id: string;
  userDetail: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.userService.getUserDetailById(params['id']).subscribe((res) => {
          if (res.user) {
            this.userDetail = res.user[0];
          }
        });
      }
    });
  }

  onDeleteUser() {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      data: { id: this.id },
    });
  }

  editUserDetails() {
    if (this.id) {
      this.router.navigate([`user/${this.id}/edit`]);
    }
  }
}
