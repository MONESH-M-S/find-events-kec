import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
  isLoading = false;
  events = [];
  private eventSub = new Subscription();
  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.eventService.getAllEvent();
    this.eventSub = this.eventService.getEventsUpdated().subscribe((res) => {
      this.events = res.events;
      this.isLoading = false;
    });
  }

  onViewEvent(eventId: string) {
    this.router.navigate([`event/${eventId}`]);
  }

  ngOnDestroy(): void {
    this.eventSub.unsubscribe();
  }
}
