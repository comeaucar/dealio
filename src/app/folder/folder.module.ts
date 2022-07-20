import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { DealsPage } from '../deals/deals.page';
import {SwiperModule} from 'swiper/angular'
import { AddDealPage } from '../add-deal/add-deal.page';
import { AccountPage } from '../account/account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  declarations: [FolderPage, DealsPage, AddDealPage, AccountPage]
})
export class FolderPageModule {}
