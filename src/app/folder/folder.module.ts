import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { DealsPage } from '../deals/deals.page';
import {SwiperModule} from 'swiper/angular'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    SwiperModule
  ],
  declarations: [FolderPage, DealsPage]
})
export class FolderPageModule {}
