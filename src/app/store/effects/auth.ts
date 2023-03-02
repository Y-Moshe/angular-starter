import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, of } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'

import ACTIONS from '../actions/auth'
import { AuthService } from '@/services'

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.signup),
      mergeMap((user) =>
        this.authService.signup(user).pipe(
          map((response) => {
            this.authService.saveAuthToken(response.token)
            return ACTIONS.signupSuccessResponse(response)
          }),
          catchError((err) => of(ACTIONS.signupErrorResponse(err)))
        )
      )
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => {
            this.authService.saveAuthToken(response.token)
            return ACTIONS.loginSuccessResponse(response)
          }),
          catchError((err) => of(ACTIONS.loginErrorResponse(err)))
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.authService.clearAuthToken()
            return ACTIONS.logoutSuccessResponse()
          }),
          catchError((err) => of(ACTIONS.logoutErrorResponse(err)))
        )
      )
    )
  )

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTIONS.loadUser),
      mergeMap(() => {
        const token = this.authService.loadAuthToken()
        if (!token) return EMPTY

        return this.authService.verifyToken(token).pipe(
          map(({ user }) => ACTIONS.setLoggedInUser(user)),
          catchError(() => {
            this.authService.clearAuthToken()
            return EMPTY
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
