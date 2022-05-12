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
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signInForm: FormGroup;
  userInfo: any;
  tokenResult: any;
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkToken();
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  async checkToken() {
    let { value } = await Storage.get({ key: 'token' });
    if (value === null) {
      return;
    } else {
      this.userService.VALIDATE_TOKEN(value).subscribe(async (data) => {
        this.tokenResult = data;
        if (this.tokenResult == 'Authenticated') {
          this.navigateToHome();
        }
      });
    }
  }

  navigateToHome() {
    this.router.navigate(['/folder/Deals']);
  }

  signInSubmit() {
    if (!this.signInForm.valid) {
      console.log('Form Invalid');
    } else {
      this.userService
        .SIGN_IN(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe(async (data) => {
          this.userInfo = data;
          if (this.userInfo.message === 'Valid Entry') {
            await Storage.set({
              key: 'token',
              value: this.userInfo.jwt,
            });
            await Storage.set({
              key: 'user',
              value: JSON.stringify(this.userInfo.user),
            });
            this.router.navigate(['/folder/Deals']);
          }
        });
    }
  }
}
