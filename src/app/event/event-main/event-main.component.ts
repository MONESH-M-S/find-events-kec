import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { EventRegisterDialogComponent } from './event-register-dialog/event-register-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-event-main',
  templateUrl: './event-main.component.html',
  styleUrls: ['./event-main.component.scss'],
})
export class EventMainComponent implements OnInit {
  id: string;
  eventDetail: Event;
  adminId: string;
  eventArray: any = [];
  showConfirmDialog = false;
  isRegistrationAvailable = true;
  msgs = [];
  isAdmin = false;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        if (params['aid']) {
          this.adminId = params['aid'];
          this.isAdmin = true;
        }
        this.eventService.getEventDetailById(params['id']).subscribe((res) => {
          if (res.event !== null) {
            this.eventDetail = res.event[0];
            const expiredMoment = moment(this.eventDetail.registrationEnd);
            const currentMoment = moment().add(-2, 'days');
            if (currentMoment.diff(expiredMoment, 'days') < 0) {
              this.isRegistrationAvailable = false;

              if (currentMoment.diff(expiredMoment, 'days') == -2) {
                this.msgs.push({
                  severity: 'info',
                  summary: 'Last 2 Days for Registration!',
                });
              } else if (currentMoment.diff(expiredMoment, 'days') == -1) {
                this.msgs.push({
                  severity: 'warn',
                  summary: 'Last Day for Registration!',
                });
              }
            } else {
              this.msgs.push({
                severity: 'error',
                summary: 'Event Registration Date Overed!',
              });
            }
            if (this.eventDetail.events) {
              this.eventArray = this.eventDetail.events[0]?.split(',');
            }
          }
        });
      }
    });
  }

  openShowRegistration() {
    if (this.isAdmin) {
      this.router.navigate([
        `event/${this.id}/admin/${this.adminId}/show-registration`,
      ]);
    }
  }

  onClickedRegister() {
    this.showConfirmDialog = true;
  }

  onRegisterForEvent() {
    this.showConfirmDialog = false;
    let dialogBoxSettings = {
      width: '500px',
      margin: '0 auto',
      disableClose: true,
      hasBackdrop: true,
      data: {
        eventDetail: this.eventDetail,
      },
    };
    this.dialog.open(EventRegisterDialogComponent, dialogBoxSettings);
  }
}
