import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onFormSubmited(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const data = {
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
    };

    this.contactService.postMessage(data).subscribe((res) => {
      if (res.contactId) {
        return this.messageService.add({
          severity: 'success',
          summary: 'Message Send To Admin!',
        });
      }
      return this.messageService.add({
        severity: 'error',
        summary: `${res.message}`,
      });
    });
    form.reset();
  }
}
