import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation, EffectCube, Thumbs } from 'swiper';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

SwiperCore.use([Pagination, Navigation, EffectCube]);

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
  days: any;
  initialSlide = 3;
  monDeals: any = [];
  tueDeals: any = [];
  wedDeals: any = [];
  thurDeals: any = [];
  friDeals: any = [];
  satDeals: any = [];
  sunDeals: any = [];
  show: boolean = false;
  currIndex = this.initialSlide;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private zone: NgZone
  ) {
    const currDate = new Date();
    this.initialSlide = currDate.getDay();
    this.sunDeals = [1];
    this.monDeals = [1, 2];
    this.tueDeals = [1, 2, 3];
    this.wedDeals = [1, 2, 3, 4];
    this.thurDeals = [1, 2, 3, 4, 5];
    this.friDeals = [1, 2, 3, 4, 5, 6];
    this.satDeals = [1, 2, 3, 4, 5, 6, 7];
  }

  ngOnInit() {
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  }

  cardTouched(day) {
    console.log(day);
  }

  onSlideChange() {
    console.log(this.swiper.swiperRef.activeIndex);
    this.currIndex = this.swiper.swiperRef.activeIndex;
    this.zone.run(() => {
      this.router
        .navigateByUrl('/folder/Deals', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/folder/Deals']);
        });
    });
  }

  handleList() {
    console.log(this.currIndex);
  }

  doRefresh(event?) {
    console.log('Startign async operation');
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }
}
