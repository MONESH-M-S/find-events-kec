import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-added-events',
  templateUrl: './admin-added-events.component.html',
  styleUrls: ['./admin-added-events.component.scss'],
})
export class AdminAddedEventsComponent implements OnInit {
  events: any = [
    { name: 'Abc', venue: 'xyz', date: '00-00-000' },
    { name: 'Abc', venue: 'xyz', date: '00-00-000' },
    { name: 'Abc', venue: 'xyz', date: '00-00-000' },
    { name: 'Abc', venue: 'xyz', date: '00-00-000' },
    { name: 'Abc', venue: 'xyz', date: '00-00-000' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
