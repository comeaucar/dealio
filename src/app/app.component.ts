import { Component } from '@angular/core';
import { DealsPage } from './deals/deals.page';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Deals', url: '/folder/Deals', icon: 'pricetag', component: DealsPage },
    { title: 'Account', url: '/folder/Account', icon: 'person' },
    { title: 'Settings', url: '/folder/Settings', icon: 'cog' },
  ];
  constructor(private signInService: UserService) {
   signInService.SIGN_IN("cartercomeau29@icloud.com", "daisy1")
  }
}
