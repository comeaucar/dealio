import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  url = 'http://localhost:4029/';
  currEst: any
  response: any;
  httpOptions;
  constructor(private http: HttpClient) { }


  async ADD_DEAL(form) {
    var res;
    await Storage.get({ key: 'est' }).then((val) => {
      this.currEst = JSON.parse(val.value)
    })
    form.establishment = this.currEst._id
    try {
      var call = this.http.post(`${this.url}deal/add`, form).toPromise()
      res = await call
    } catch (err) {
      res = err
    }
    return res
  }

  async GET_DEAL(day) {
    var res;
    var weekday = {
      day: day
    }
    try {
      var call = this.http.post(`${this.url}deal/get`, weekday).toPromise()
      res = await call
    } catch (err) {
      res = err
    }
    return res
  }

}
