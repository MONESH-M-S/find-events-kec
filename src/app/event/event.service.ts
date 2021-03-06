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
  private getAllEvents = new Subject<{ events: Event[] }>();
  private getEventsRegisterationDetail = new Subject<{
    registers: any[];
  }>();

  constructor(private http: HttpClient) {}

  getAllEvent() {
    return this.http
      .get<{ events: Event[]; message: string }>(`${this.BACKEND_URL}event/`)
      .subscribe((res) => {
        this.getAllEvents.next({
          events: res.events,
        });
      });
  }

  getEventsUpdated() {
    return this.getAllEvents.asObservable();
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
    return this.http.post<{ registrationId: string; message: string }>(
      `${this.BACKEND_URL}register/`,
      form
    );
  }

  checkAlreadyRegistered(data: any) {
    return this.http.post<{ count: number; message: string }>(
      `${this.BACKEND_URL}register/check-registration`,
      data
    );
  }

  getRegistrationDetailsByEventId(eventId: string) {
    this.http
      .get<{ registers: any; message: string }>(
        `${this.BACKEND_URL}register/${eventId}`
      )

      .subscribe((res) => {
        this.getEventsRegisterationDetail.next({
          registers: res.registers,
        });
      });
  }

  getRegistrationDetailsUpdated() {
    return this.getEventsRegisterationDetail.asObservable();
  }
}
