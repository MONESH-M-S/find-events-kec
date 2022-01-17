import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  BACKEND_URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  postMessage(data: Contact) {
    return this.http.post<{ contactId: string; message: string }>(
      `${this.BACKEND_URL}contact/`,
      data
    );
  }
}
