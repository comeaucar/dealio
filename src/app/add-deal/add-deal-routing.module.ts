import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDealPage } from './add-deal.page';

const routes: Routes = [
  {
    path: '',
    component: AddDealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDealPageRoutingModule {}
