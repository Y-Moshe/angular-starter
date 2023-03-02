import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Store } from '@ngrx/store'
import { IAppStore, selectors } from '@/store'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RequireAuthGuard implements CanActivate {
  constructor(private store: Store<IAppStore>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select(selectors.selectLoggedInUser)
      .pipe(map((user) => user !== null))
  }
}
