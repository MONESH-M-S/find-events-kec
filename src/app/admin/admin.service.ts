import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  adminLogin(email: string, password: string) {
    const data = { email: email, password: password };
    return this.http.post<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/login`,
      data
    );
  }
}
