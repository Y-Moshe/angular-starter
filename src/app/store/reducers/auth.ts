import { createReducer, on } from '@ngrx/store'
import { IUser } from '@/types'
import ACTIONS from '../actions/auth'

export interface IAuthState {
  loggedInUser: IUser | null
  isSubmitting: boolean
  isLoggingOut: boolean
}

const initialState: IAuthState = {
  loggedInUser: null,
  isSubmitting: false,
  isLoggingOut: false,
}

export default createReducer<IAuthState>(
  initialState,
  on(ACTIONS.setLoggedInUser, (state, user) => ({
    ...state,
    loggedInUser: user,
  })),

  // Login & Signup
  on(ACTIONS.login, ACTIONS.signup, (state) => ({
    ...state,
    isSubmitting: true,
  })),

  on(
    ACTIONS.loginSuccessResponse,
    ACTIONS.signupSuccessResponse,
    (state, { user }) => ({
      ...state,
      loggedInUser: user,
      isSubmitting: false,
    })
  ),

  // Logout
  on(ACTIONS.logout, (state) => ({
    ...state,
    isLoggingOut: true,
  })),

  on(ACTIONS.logoutSuccessResponse, (state) => ({
    ...state,
    loggedInUser: null,
    isLoggingOut: false,
  })),

  // Error handling
  on(
    ACTIONS.loginErrorResponse,
    ACTIONS.signupErrorResponse,
    ACTIONS.logoutErrorResponse,
    (state) => ({
      ...state,
      isSubmitting: false,
      isLoggingOut: false,
    })
  )
)
