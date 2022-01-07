import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  userLogin(data: { email: string; password: string }) {
    return this.http.post<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/login`,
      data
    );
  }

  userSignup(data) {
    return this.http.post<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/signup`,
      data
    );
  }

  getUserDetailById(id: string) {
    return this.http.get<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/${id}`
    );
  }

  updateUserDetail(userData: User, id: string) {
    return this.http.put<{ message: string }>(
      `${this.BACKEND_URL}user/${id}`,
      userData
    );
  }

  deleteUser(id: string) {
    return this.http.delete<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/${id}`
    );
  }
}
