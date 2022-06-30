import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDealPageRoutingModule } from './add-deal-routing.module';

import { AddDealPage } from './add-deal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDealPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddDealPage]
})
export class AddDealPageModule {}
