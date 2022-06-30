import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation, EffectCube, Thumbs } from 'swiper';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DealService } from '../services/deal.service';
import { LoadingService } from '../services/loading.service';

SwiperCore.use([Pagination, Navigation, EffectCube]);

@Component({
  selector: 'app-deals',
  templateUrl: './deals.page.html',
  styleUrls: ['./deals.page.scss'],
})
export class DealsPage implements OnInit {
  days: any;
  initialSlide: any;
  currNumDeals: any
  loading$ = this.loader.loading$
  monDeals: any = [];
  tueDeals: any = [];
  wedDeals: any = [];
  thurDeals: any = [];
  friDeals: any = [];
  satDeals: any = [];
  sunDeals: any = [];
  show: boolean = false;
  currIndex: any;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private zone: NgZone,
    private dealService: DealService,
    private loader: LoadingService
  ) {
    const currDate = new Date();
    this.initialSlide = currDate.getDay();
    this.currIndex = this.initialSlide
    this.sunDeals = [];
    this.monDeals = [];
    this.tueDeals = [];
    this.wedDeals = [];
    this.thurDeals = [];
    this.friDeals = [];
    this.satDeals = [];
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

    this.getDeals()
  }

  cardTouched(day) {
    console.log(day);
  }

  getDeals(event?) {
    try {
      this.dealService.GET_DEAL(this.days[this.currIndex]).then((res) => {
        console.log(res)
        switch (this.currIndex) {
          case 0:
            this.sunDeals = res
            this.currNumDeals = this.sunDeals.length
            break;
          case 1:
            this.monDeals = res
            break
          case 2:
            this.tueDeals = res
            break;
          case 3:
            this.wedDeals = res
            break;
          case 4:
            this.thurDeals = res
            break
          case 5:
            this.friDeals = res
            break;
          case 6:
            this.satDeals = res
            break;
        }
      }).then(() => this.updateSlide()).finally(() => {
        this.getCurrNumDeals();
        if (event) {
          event.target.complete()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  onSlideChange() {
    console.log(this.swiper.swiperRef.activeIndex);
    this.currIndex = this.swiper.swiperRef.activeIndex;
    this.getDeals()
  }

  getCurrNumDeals() {
    console.log(this.sunDeals.length)
    switch (this.currIndex) {
      case 0:
        this.currNumDeals = this.sunDeals.length
        break;
      case 1:
        this.currNumDeals = this.monDeals.length
        break
      case 2:
        this.currNumDeals = this.tueDeals.length
        break;
      case 3:
        this.currNumDeals = this.wedDeals.length
        break;
      case 4:
        this.currNumDeals = this.thurDeals.length
        break
      case 5:
        this.currNumDeals = this.friDeals.length
        break;
      case 6:
        this.currNumDeals = this.satDeals.length
        break;
    }
  }

  updateSlide() {
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

  async doRefresh(event?) {
    console.log('Starting async operation');
    this.getDeals(event)
    //event.target.complete();
  }
}
