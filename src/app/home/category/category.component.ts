import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  events = [];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getAllEvents().subscribe((res) => {
      this.events = res.events;
    });
  }
}
