import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EventService } from 'src/app/event/event.service';

@Component({
  selector: 'app-solo',
  templateUrl: './solo.component.html',
  styleUrls: ['./solo.component.scss'],
})
export class SoloComponent implements OnInit {
  form: FormGroup;
  eventId: string;
  isLoading = false;
  year = ['1st Year', '2nd Year', '3rd Year', '4th Year']
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SoloComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { name: string },
    private messageService: MessageService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.route.params.subscribe((params) => {
      if (params) {
        this.eventId = params['id'];
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      rollno: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      department: ['', [Validators.required]],
      yearOfStudy: ['', [Validators.required]],
      subEventName: ['', [Validators.required]],
      eventId: [''],
      eventName: [this.data.name],
      userId: [''],
      registeredDate: ['']
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

    this.getUserIdByEmail(this.form.value.email);
  }

  private getUserIdByEmail(email: string) {
    this.eventService.getUserIdByEmail(email).subscribe((res) => {
      if (res.id === null) {
        this.dialogRef.close();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please Signup to Register!',
        });
        return this.router.navigate(['user/signup']);
      }


    });
  }
}
