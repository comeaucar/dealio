import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation, EffectCube } from 'swiper';


SwiperCore.use([Pagination, Navigation, EffectCube]);

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
  days: any;
  initialSlide = 6;

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor() {}

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
  }
}
