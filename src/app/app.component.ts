import { Component, OnInit } from '@angular/core';
import { DealsPage } from './deals/deals.page';
import { UserService } from './services/user.service';
import { AddDealPage } from './add-deal/add-deal.page';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userType: string;
  user: any;

  public appPages = []

  userPages = [
    {
      title: 'Deals',
      url: '/folder/Deals',
      icon: 'pricetag',
      component: DealsPage,
    },
    { title: 'Account', url: '/folder/Account', icon: 'person' },
    { title: 'Settings', url: '/folder/Settings', icon: 'cog' },
  ];

  managerPages = [
    {
      title: 'Deals',
      url: '/folder/Deals',
      icon: 'pricetag',
      component: DealsPage,
    },
    {
      title: 'Add Deal',
      url: '/folder/AddDeal',
      icon: 'add',
      component: AddDealPage,
    },

    { title: 'Account', url: '/folder/Account', icon: 'person' },
    { title: 'Settings', url: '/folder/Settings', icon: 'cog' },
  ];

  constructor() {
  }

  async ngOnInit() {
    await this.getKey();
  }

  async getKey() {
    await Storage.get({
      key: 'user',
    }).then((res) => {
      console.log(res)
      this.user = JSON.parse(res.value);
      if (this.user.userType === 'Manager') {
        this.userType = 'Manager';  
        this.appPages = this.managerPages
      } else if (this.user.userType === 'Admin') {
        this.userType = 'Admin';
      } else {
        this.userType = 'User';
        this.appPages = this.userPages
      }
    });
  }
}
