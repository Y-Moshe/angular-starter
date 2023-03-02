import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ofType, Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'

import { IAppStore, actions, selectors } from '@/store'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  isSubmitting$!: Observable<boolean>
  loginSuccessSub!: Subscription
  loginErrorSub!: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppStore>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    })

    this.isSubmitting$ = this.store.select(selectors.selectIsSubmitting)

    this.loginSuccessSub = this.actions$
      .pipe(ofType(actions.loginSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))

    this.loginErrorSub = this.actions$
      .pipe(ofType(actions.loginErrorResponse))
      .subscribe((error) => {
        this.loginForm.enable()
        console.log('error', error)
      })
  }

  // Helper function
  hasError(fieldName: string, errorName: string) {
    const ctrl = this.loginForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.loginForm.invalid) return
    this.loginForm.disable()

    const credintials = { ...this.loginForm.value }
    this.store.dispatch(actions.login(credintials))
  }

  ngOnDestroy(): void {
    this.loginSuccessSub.unsubscribe()
    this.loginErrorSub.unsubscribe()
  }
}
