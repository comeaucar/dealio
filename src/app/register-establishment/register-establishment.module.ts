import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterEstablishmentPageRoutingModule } from './register-establishment-routing.module';

import { RegisterEstablishmentPage } from './register-establishment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterEstablishmentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterEstablishmentPage]
})
export class RegisterEstablishmentPageModule {}
