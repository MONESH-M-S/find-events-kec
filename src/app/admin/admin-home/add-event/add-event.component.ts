import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { mimeType } from './mime-type.validators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  id: string;
  mode = ['Online', 'Offline'];
  imageDisplay!: string | null;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this._initEventForm();
  }

  onUpload(event: any) {
    const file = event.files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  goBack() {
    this.location.back();
  }

  private _initEventForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      registrationStart: ['', [Validators.required]],
      registrationEnd: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id: [''],
      image: [
        '',
        { validators: [Validators.required], asyncValidators: [mimeType] },
      ],
    });
  }

  clearForm() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const f = this.form.value;
    const eventData = new FormData();
    eventData.append('name', f.name);
    eventData.append('venue', f.venue);
    eventData.append('mode', f.mode);
    eventData.append('registrationStart', f.registrationStart);
    eventData.append('registrationEnd', f.registrationEnd);
    eventData.append('eventDate', f.eventDate);
    eventData.append('description', f.description);
    eventData.append('id', this.id);
    eventData.append('image', f.image, f.name);

    this.adminService.addNewEvent(eventData).subscribe(
      (res) => {
        if (res.event !== null) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.router;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      },
      (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      }
    );
  }
}
