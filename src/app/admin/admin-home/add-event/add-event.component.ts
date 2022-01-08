import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  constructor(private location: Location, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initEventForm();
  }

  onUpload(event) {
    const file = event.files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
  }

  goBack() {
    this.location.back();
  }

  private _initEventForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      organiser_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      a_phone: ['', [Validators.required]],
      registrationStart: ['', [Validators.required]],
      registrationEnd: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: [
        '',
        { validators: [Validators.required], asyncValidators: [mimeType] },
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
