import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Event } from '../../event/event.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  events: any;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getAllEvents().subscribe((res) => {
      this.events = res.events;
    });
  }
}
