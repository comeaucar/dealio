import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  result: any;
  token: any;
  authed: boolean;
  constructor(private userService: UserService, private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    var token: string;
    const getToken = async () => {
      var { value } = await Storage.get({ key: "token" })
      token = value
    }
    await getToken()
    const authed = await this.userService.GUARD_RESPONSE(token)
    if (authed) {
      return true
    } else {
      this.navigate()
      return false
    }
  }

  navigate() {
    this.router.navigate(['/sign-in']);
  }
}
