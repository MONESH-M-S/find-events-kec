import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-registration-detail',
  templateUrl: './registration-detail.component.html',
  styleUrls: ['./registration-detail.component.scss'],
})
export class RegistrationDetailComponent implements OnInit {
  registrationDetail = [];
  isRegistrationAvailable = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.userService
          .getUserRegistrationDetail(params['id'])
          .subscribe((res) => {
            if (res.registers !== null) {
              this.isRegistrationAvailable = true;
              this.registrationDetail = res.registers;
            }
          });
      }
    });
  }
}
