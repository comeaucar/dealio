import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DealService } from '../services/deal.service';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.page.html',
  styleUrls: ['./add-deal.page.scss'],
})
export class AddDealPage implements OnInit {
  dealTypes = ['Repeating', 'Limited', 'Time Limit'];
  dealTimes = ['All Day', 'Between Certain Hours'];
  amPm = ['AM', 'PM'];

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  selectedDealType: any;
  selectedDealTime: any;
  fromTime: any;
  toTime: any;
  loading$ = this.loader.loading$;
  dealForm: FormGroup;
  selectedDays = Array()
  response: any

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public loader: LoadingService,
    public dealService: DealService
  ) {}

  ngOnInit() {
    this.dealForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dealType: ['', [Validators.required]],
      numberAvailable: [''],
      daysToRepeat: [''],
      adultOnly: [false, [Validators.required]],
      fromTime: [''],
      toTime: [''],
      allDay: ['']
    });
  }

  daySelected(day) {
    console.log(day + " selected")
    this.selectedDays.push(day)
  }

  checkValue(event) {
    console.log(event.detail.value);
    this.selectedDealType = this.dealTypes[event.detail.value];
  }

  checkValueTwo(event) {
    console.log(event.detail.value);
    this.selectedDealTime = this.dealTimes[event.detail.value];
  }

  checkValueThree(event) {
    console.log(event.detail.value);
    this.fromTime = this.amPm[event.detail.value];
  }

  checkValueFour(event) {
    console.log(event.detail.value);
    this.toTime = this.amPm[event.detail.value];
  }

  dealSubmit() {
    this.dealForm.value.dealType = this.selectedDealType
    if(this.selectedDealType === "Repeating"){
      this.dealForm.value.daysToRepeat = this.selectedDays
    } 
    if (this.selectedDealTime === 'All Day') {
      this.dealForm.value.allDay = true
    } else {
      this.dealForm.value.allDay = false
      this.dealForm.value.fromTime = this.dealForm.value.fromTime + this.fromTime
       this.dealForm.value.toTime = this.dealForm.value.toTime + this.toTime
    }
    console.log(this.dealForm.value)

    try {
      this.dealService.ADD_DEAL(this.dealForm.value).then((res) => {
        console.log(res)
        this.response = res
        if (this.response.message == 'Deal Added Success') {
          this.router.navigate(['/folder/Deals'])
        }
        this.dealForm.reset()
        this.selectedDealType = null
        this.selectedDealTime = null
        this.fromTime= null
        this.toTime = null
        this.selectedDays = []
      })
    } catch (err) {
      console.log(err)
    }
  }
}
