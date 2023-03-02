import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Actions, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'

import { IAppStore, actions, selectors } from '@/store'

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup
  isSubmitting$!: Observable<boolean>
  signupSuccessSub!: Subscription
  signupErrorSub!: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppStore>,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      lastName: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    })

    this.isSubmitting$ = this.store.pipe(select(selectors.selectIsSubmitting))

    this.signupSuccessSub = this.actions$
      .pipe(ofType(actions.signupSuccessResponse))
      .subscribe(() => this.router.navigate(['/']))

    this.signupErrorSub = this.actions$
      .pipe(ofType(actions.signupErrorResponse))
      .subscribe((error) => {
        this.signupForm.enable()
        console.log('error', error)
      })
  }

  // Helper function
  hasError(fieldName: string, errorName: string) {
    const ctrl = this.signupForm.get(fieldName)
    return ctrl?.touched && ctrl?.hasError(errorName)
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.signupForm.invalid) return
    this.signupForm.disable()

    const userData = { ...this.signupForm.value }
    this.store.dispatch(actions.signup(userData))
  }

  ngOnDestroy(): void {
    this.signupErrorSub.unsubscribe()
    this.signupErrorSub.unsubscribe()
  }
}
