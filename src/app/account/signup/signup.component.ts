import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  gender = ['Male', 'Female'];
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this._initUserForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
    const userData = new FormData();
    userData.append('name', this.form.value.name);
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }
}
