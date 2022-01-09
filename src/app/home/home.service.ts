import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  getAllEvents() {
    return this.http.get<{ events: any; message: string }>(
      `${this.BACKEND_URL}event/`
    );
  }
}
