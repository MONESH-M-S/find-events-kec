import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  uploadedFile: File;
  constructor(private location: Location, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initEventForm();
  }

  onUpload(event) {
    this.uploadedFile = event.files[0];
    console.log(this.uploadedFile);
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
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  onSubmit() {}
}
