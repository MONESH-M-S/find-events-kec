import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  form: FormGroup;
  adminId: string;
  eventId: string;
  imageDisplay: string | null;
  imageClicked: boolean = false;
  mode = ['Online', 'Offline'];
  eventData: any = [];
  isLoading = false;
  availableEvents = [
    'Paper Presentation(Solo)',
    'Paper Presentation(Team)',
    'Project Presentation(Team)',
    'Idea Presentation(Team)',
    'Quiz(Solo)',
    'Quiz(Team)',
    'Poster Submission',
    'Debate(Solo)',
    'Speech(Solo)',
    'IPL Auction(Team)',
    'Essay Writing(Solo)',
    'Poem Writing(Solo)',
    'Drawing(Solo)',
    'Drawing(Solo)',
    'Singing(Solo)',
    'Dancing(Solo)',
    'Dancing(Team)',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._initForm();

    this.route.params.subscribe((params) => {
      if (params) {
        this.eventId = params['id'];
        this.adminId = params['aid'];
        this.adminService.getEventById(params['id']).subscribe((res) => {
          if (res.event !== null) {
            this.eventData = res.event[0];
            this._setFormValues();
            this.isLoading = false;
          }
        });
      }
    });
  }

  onUpload(event: any) {
    this.imageClicked = true;
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

  clearForm() {
    this.form.reset();
  }

  onSubmit() {
    this.isLoading = true;

    if (!this.imageClicked) {
    }

    if (this.form)
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
    eventData.append('organisation', f.organisation);
    eventData.append('events', f.events);
    eventData.append('id', this.adminId);
    eventData.append('image', f.image, f.name);

    this.adminService.editEvent(eventData, this.eventId).subscribe(
      (res) => {
        if (res.message === 'Event Updated!') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          this.location.back();
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
    this.isLoading = false;
    this.form.reset();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      registrationStart: ['', [Validators.required]],
      registrationEnd: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      organisation: ['', [Validators.required]],
      events: [[], [Validators.required]],
      description: ['', [Validators.required]],
      id: [''],
      image: ['', [Validators.required]],
    });
  }

  private _setFormValues() {
    this.form.get('name').setValue(this.eventData.name);
    this.form.get('venue').setValue(this.eventData.venue);
    this.form.get('mode').setValue(this.eventData.mode);
    this.form
      .get('registrationStart')
      .setValue(new Date(this.eventData.registrationStart));
    this.form
      .get('registrationEnd')
      .setValue(new Date(this.eventData.registrationEnd));
    this.form.get('eventDate').setValue(new Date(this.eventData.eventDate));
    this.form.get('organisation').setValue(this.eventData.organisation);
    this.form.get('events').setValue(this.eventData.events[0].split(','));
    this.form.get('description').setValue(this.eventData.description);
    this.form.get('image').setValue(this.eventData.image);
    this.imageDisplay = this.eventData.image;
  }
}
