import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  currDate: any;
  maxYear: any;
  minYear: any;
  signUpForm: FormGroup;
  response: any;
  submitted = false;
  invalidEmail: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    var today = new Date();
    this.maxYear = today.getFullYear() - 14;
    this.minYear = today.getFullYear() - 110;
    today.setFullYear(today.getFullYear() - 14);
    this.currDate = today.toISOString();
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$&])(.{6,})$'),
        ],
      ],
      dob: [this.currDate, [Validators.required]],
    });
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  async signUpSubmit() {
    this.submitted = true;
    if (!this.signUpForm.valid) {
      console.log('Invalid Form');
      console.log(this.signUpForm.errors);
    } else {
      try {
        this.userService.SIGN_UP(this.signUpForm.value).then(async (res) => {
          this.response = res;
          if (this.response === "Bad Request") {
            this.invalidEmail = true
            return
          }
          if (this.response.message === 'User Added') {
            await Storage.set({
              key: 'token',
              value: this.response.jwt,
            });
            await Storage.set({
              key: 'user',
              value: JSON.stringify(this.response.user),
            });
            this.router.navigate(['/sign-in']);
          }
        });
      } catch (err) {
        console.log(err)
      }
    }
  }
}
