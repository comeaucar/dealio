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
import { EstablishmentService } from '../services/establishment.service';
import { LoadingService } from '../services/loading.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-establishment',
  templateUrl: './register-establishment.page.html',
  styleUrls: ['./register-establishment.page.scss'],
})
export class RegisterEstablishmentPage implements OnInit {
  register_est_form: FormGroup;
  register_account_form: FormGroup;
  submitted = false;
  invalidEmail = false;
  registered = false;
  loading$ = this.loader.loading$;
  response: any;
  estRes: any;
  currUser: any;
  countries = ['Canada', 'United States'];
  provinces = [
    'Ontario',
    'Quebec',
    'Nova Scotia',
    'New Brunswick',
    'Manitoba',
    'British Columbia',
    'Prince Edward Island',
    'Saskatchewan',
    'Alberta',
    'Newfoundland & Labrador',
  ];
  types = ['Restaurant', 'Bar', 'Nightclub', 'Store', 'Fast Food'];
  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private estService: EstablishmentService,
    public loader: LoadingService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.register_est_form = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      address_2: [''],
      city: ['', [Validators.required]],
      province_state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });

    this.register_account_form = this.formBuilder.group({
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
          Validators.pattern(
            '^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$&])(.{6,})$'
          ),
        ],
      ],
    });
  }

  get registerEstFormControl() {
    return this.register_est_form.controls;
  }

  get registerAccFormControl() {
    return this.register_account_form.controls;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Account Created',
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Establishment Submitted!',
      message:
        'Please allow up to 24 hours for us to approve your submission. Once you are approved you may begin to post deals on Dealio.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/folder/Deals']).then(() => window.location.reload());
          },
        },
      ],
    });

    await alert.present();
  }

  async registerAccSubmit() {
    this.submitted = true;
    if (!this.register_account_form.valid) {
      console.log('Invalid Form');
      console.log(this.register_est_form.errors);
    } else {
      try {
        this.submitted = false;
        this.register_account_form.value.userType = "Manager"
        await this.userService
          .SIGN_UP(this.register_account_form.value)
          .then(async (res) => {
            console.log(res);
            this.response = res;
            if (this.response === 'Bad Request') {
              this.invalidEmail = true;
              return;
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
              this.currUser = this.response.user;
              this.presentToast();
              this.registered = true;
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async registerSubmit() {
    this.submitted = true;
    if (!this.register_est_form.valid) {
      console.log('Invalid Form');
      console.log(this.register_est_form.errors);
    } else {
      try {
        this.register_est_form.value.user = this.currUser._id;
        await this.estService
          .ADD_EST(this.register_est_form.value)
          .then(async (res) => {
            this.estRes = res;
            if (this.estRes === 'Bad Request') {
              console.log('Could not save restaurant');
              return;
            }
            if (this.estRes.message === 'Added Successfully') {
              await Storage.set({
                key: "est",
                value: JSON.stringify(this.estRes.est)
              })
              this.presentAlert();
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
