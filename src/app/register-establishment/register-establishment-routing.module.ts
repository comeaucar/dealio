import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterEstablishmentPage } from './register-establishment.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterEstablishmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterEstablishmentPageRoutingModule {}
