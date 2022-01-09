import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-added-events',
  templateUrl: './admin-added-events.component.html',
  styleUrls: ['./admin-added-events.component.scss'],
})
export class AdminAddedEventsComponent implements OnInit {
  id: string;
  events: any = [];
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.adminService.getAdminAddedEvents(params['id']).subscribe((res) => {
          if (res.events !== null) {
            this.events = res.events;
          }
        });
      }
    });
  }

  onViewEvent(eventId: string) {
    this.router.navigate([`event/${eventId}/admin/${this.id}`]);
  }

  onEditEvent(eventId: string) {
    this.router.navigate([`admin/${eventId}/edit/event/${this.id}`]);
  }
}
