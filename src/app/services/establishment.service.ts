import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  url = 'http://localhost:4029/';
  response: any;
  httpOptions;
  constructor(private http: HttpClient) { }


  async ADD_EST(form) {
    var res;
    try {
      var call = this.http.post(`${this.url}est/add`, form).toPromise()
      res = await call;
    } catch (err) {
      res = err.statusText
    }
    return res;
  } 
}
