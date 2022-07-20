import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {


  currUser = {
    firstname: "-",
    lastname: "-",
    email: "-",
    DOB: "1970-01-01"
  };

  constructor(private router: Router) { }

  ngOnInit() {

    Storage.get({ key: "user" }).then((res) => {
      console.log(JSON.parse(res.value))
      this.currUser = JSON.parse(res.value)
    })

    console.log(this.currUser)
  }

  signOut() {
    console.log("Signing Out")
    Storage.clear().then(() => this.router.navigate(['/sign-in']));

  }
}
