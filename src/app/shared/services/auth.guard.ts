import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  production: boolean;

  constructor(private _authService: AuthService, private _router: Router) {
    this.production = environment.production;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const ok: boolean = isUser(this._authService.getFirestoreUser());

    if (!ok) {
      this._router.navigate(['access'])
      return false
    }

    return ok;

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = `/${route.path}`;
    url = (url) ? url : 'access';

    // return this.checkLogin(url);
    const ok: boolean = isUser(this._authService.getFirestoreUser());

    if (!ok) {
      this._router.navigate(['access'])
      return false;
    }


    return ok;
  }
}

function isUser(user: any): boolean {
  return (user) ? true : false;
}

