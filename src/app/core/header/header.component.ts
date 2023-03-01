import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Actions, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { IAppStore, actions, selectors } from '@store'
import { IUser } from '@types'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser | null>
  isLoggingOut$!: Observable<boolean>
  logoutSub!: Subscription

  constructor(
    private store: Store<IAppStore>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggingOut$ = this.store.select(selectors.selectIsLoggingOut)
    this.user$ = this.store.select(selectors.selectLoggedInUser)

    this.logoutSub = this.actions$
      .pipe(ofType(actions.logoutSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))
  }

  handleLogout() {
    this.store.dispatch(actions.logout())
  }

  ngOnDestroy(): void {
    this.logoutSub.unsubscribe()
  }
}
