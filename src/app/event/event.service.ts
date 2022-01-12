import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  BACKEND_URL = environment.BACKEND_URL;
  private getEvents = new Subject<{ events: Event[] }>();

  constructor(private http: HttpClient) {}

  getAllEvent() {
    return this.http
      .get<{ events: Event[]; message: string }>(`${this.BACKEND_URL}event/`)
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

  getUserIdByEmail(email: string) {
    return this.http.get<{ id: string; message: string }>(
      `${this.BACKEND_URL}user/email/${email}`
    );
  }

  postNewRegistration(form: any) {
    return this.http.post<{ registration: any; message: string }>(
      `${this.BACKEND_URL}register/`,
      form
    );
  }
}
