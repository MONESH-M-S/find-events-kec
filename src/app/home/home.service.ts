import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../event/event.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<{ events: Event; message: string }>(
      `${this.BACKEND_URL}event/`
    );
  }
}
