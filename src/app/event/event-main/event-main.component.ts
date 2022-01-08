import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-main',
  templateUrl: './event-main.component.html',
  styleUrls: ['./event-main.component.scss'],
})
export class EventMainComponent implements OnInit {
  id: string;
  eventDetail: any;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.eventService.getEventDetailById(params['id']).subscribe((res) => {
          if (res.event !== null) {
            this.eventDetail = res.event[0];
          }
        });
      }
    });
  }
}
