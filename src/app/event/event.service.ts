import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  BACKEND_URL = environment.BACKEND_URL;
  private getEvents = new Subject<{ events: any[] }>();

  constructor(private http: HttpClient) {}

  getAllEvent() {
    return this.http
      .get<{ events: any; message: string }>(`${this.BACKEND_URL}event/`)
      .subscribe((res) => {
        this.getEvents.next({
          events: res.events,
        });
      });
  }

  getEventsUpdated() {
    return this.getEvents.asObservable();
  }

  getEventDetailById(id: string) {
    return this.http.get<{ event: any; message: string }>(
      `${this.BACKEND_URL}event/${id}`
    );
  }
}
