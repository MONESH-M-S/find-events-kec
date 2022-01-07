import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: string;
  userData: User;
  form: FormGroup;
  gender = ['Male', 'Female'];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._initUserForm();

    this.route.params.subscribe(async (params) => {
      if (params) {
        this.id = params['id'];
        await this.userService
          .getUserDetailById(params['id'])
          .subscribe((res) => {
            if (res.user == null) {
              this.router.navigate([`user/signup`]);
              return this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Editing User Failed, Please Signup',
              });
            }
            if (res.user) {
              this.userData = res.user[0];
              this._setFormValues();
            }
          });
      }
    });
  }

  onSubmit() {
    if (!this.form) {
      return;
    }
    const userUpdatedDetail = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      gender: this.form.value.gender,
    };
    this.userService
      .updateUserDetail(userUpdatedDetail, this.id)
      .subscribe((res) => {
        if (res.message === 'User Updated!') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Updating user failed, Try again later',
          });
        }
        return this.router.navigate([`user/${this.id}`]);
      });
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [0, Validators.required],
      gender: [''],
    });
  }

  private _setFormValues() {
    this.form.get('name').setValue(this.userData.name);
    this.form.get('email').setValue(this.userData.email);
    this.form.get('phone').setValue(this.userData.phone);
    this.form.get('gender').setValue(this.userData.gender);
  }
}
