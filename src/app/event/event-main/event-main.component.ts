import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../event.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-main',
  templateUrl: './event-main.component.html',
  styleUrls: ['./event-main.component.scss'],
})
export class EventMainComponent implements OnInit {
  id: string;
  eventDetail: Event;
  adminId: string;
  eventArray = [];
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        if (params['aid']) {
          this.adminId = params['aid'];
        }
        this.eventService.getEventDetailById(params['id']).subscribe((res) => {
          if (res.event !== null) {
            this.eventDetail = res.event[0];
            if (this.eventDetail.events) {
              this.eventArray = this.eventDetail.events[0].split(',');
            }
          }
        });
      }
    });
  }
}
