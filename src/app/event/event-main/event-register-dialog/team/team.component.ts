import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/event/event.service';
import { Event } from 'src/app/event/event.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  availableEvents = [];
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { event: Event },
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.availableEvents = this.data.event.events[0]?.split(',');
    this._initForm();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      teamMembersName: ['', [Validators.required]],
      rollno: ['', [Validators.required, Validators.minLength(8)]],
      teamName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      department: ['', [Validators.required]],
      subEventName: ['', [Validators.required]],
      eventId: [this.data.event._id],
      eventName: [this.data.event.name],
      userId: [''],
      registeredDate: [new Date()],
      type: ['team'],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Details!',
      });
    }

    const f = this.form.value;

    this.eventService.getUserIdByEmail(f.email).subscribe((res) => {
      if (res.id === null) {
        this.dialogRef.close();
        this.router.navigate(['user/signup']);
        return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You need to Signup for Registering!',
        });
      } else {
        const form = {
          userName: f.userName,
          rollno: f.rollno,
          email: f.email,
          teamMembersName: f.teamMembersName,
          teamName: f.teamName,
          phone: f.phone,
          department: f.department,
          subEventName: f.subEventName,
          eventId: f.eventId,
          eventName: f.eventName,
          userId: res.id,
          registeredDate: f.registeredDate,
          type: f.type,
        };

        const checkRegistration = {
          email: f.email,
          eventId: f.eventId,
          subEventName: f.subEventName,
        };

        this.eventService
          .checkAlreadyRegistered(checkRegistration)
          .subscribe((res) => {
            if (res.count === 0 && res.message == 'Allowed to register') {
              this.eventService.postNewRegistration(form).subscribe((res) => {
                if (res.registrationId) {
                  this.messageService.add({
                    severity: 'error',
                    summary: `${res.message}`,
                  });
                } else {
                  this.messageService.add({
                    severity: 'success',
                    summary: `${res.message}`,
                  });
                }
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `You have already registered for this event`,
              });
            }
          });
        this.dialogRef.close();
      }
    });
  }
}
