import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:4029/';
  tokenResult: any;
  canAct: boolean
  response: any
  httpOptions
  constructor(private http: HttpClient) {
  }

  SIGN_IN(email, password) {
    return this.http.post(`${this.url}user/sign-in`, {
      email: email,
      password: password,
    });
  }

  SIGN_UP() {}

    VALIDATE_TOKEN(token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.post(`${this.url}auth/auth-token`,{},this.httpOptions)
    }
  
  VALIDATE_TOKEN_CLONE(token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.http.post(`${this.url}auth/auth-token`,{},this.httpOptions).toPromise()
  }
  
  
  async GUARD_RESPONSE(token) {

    const res = await this.VALIDATE_TOKEN_CLONE(token).then((res) => {
      this.response = res
      if (this.response === "Authenticated") {
        return true
      } else {
        return false
      }
    })

    return res
  }
  
  
    

  

}
