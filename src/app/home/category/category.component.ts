import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  events: any;
  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.homeService.getAllEvents().subscribe((res) => {
      this.events = res.events;
    });
  }

  onEventClicked(id: string) {
    this.router.navigate([`event/${id}`]);
  }
}
