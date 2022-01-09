import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BACKEND_URL = environment.BACKEND_URL;
  private getAdmins = new Subject<{ admins: Admin[] }>();

  constructor(private http: HttpClient) {}

  adminLogin(email: string, password: string) {
    const data = { email: email, password: password };
    return this.http.post<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/login`,
      data
    );
  }

  adminSignup(adminData: Admin) {
    return this.http.post<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/signup`,
      adminData
    );
  }

  getAdminUpdated() {
    return this.getAdmins.asObservable();
  }

  getAllAdmins() {
    return this.http
      .get<{ admins: Admin[]; message: string }>(`${this.BACKEND_URL}admin/`)
      .subscribe((res) => {
        this.getAdmins.next({
          admins: res.admins,
        });
      });
  }

  getAdminDetailById(id: string) {
    return this.http.get<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/detail/${id}`
    );
  }

  getAdminAddedEvents(aid: string) {
    return this.http.get<{ events: any; message: string }>(
      `${this.BACKEND_URL}event/admin/${aid}`
    );
  }

  getEventById(id: string) {
    return this.http.get<{ event: any; message: string }>(
      `${this.BACKEND_URL}event/${id}`
    );
  }

  deleteAdminById(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.BACKEND_URL}admin/${id}`
    );
  }

  // Add-new event
  addNewEvent(eventData: any) {
    return this.http.post<{ event: any; message: string }>(
      `${this.BACKEND_URL}event/new`,
      eventData
    );
  }

  // edit event
  editEvent(eventData: any, id: string) {
    return this.http.put<{ message: string }>(
      `${this.BACKEND_URL}event/${id}`,
      eventData
    );
  }
}
