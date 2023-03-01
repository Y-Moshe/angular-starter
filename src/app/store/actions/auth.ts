import { createActionGroup, props, emptyProps } from '@ngrx/store'
import { IBaseErrorResponse, ILoginResponse, IUser, ICredentials } from '@types'

export default createActionGroup({
  source: 'Auth API',
  events: {
    'Set Logged In User': props<IUser | null>(),
    Signup: props<IUser>(),
    'Signup Success Response': props<ILoginResponse>(),
    'Signup Error Response': props<IBaseErrorResponse>(),
    Login: props<ICredentials>(),
    'Login Success Response': props<ILoginResponse>(),
    'Login Error Response': props<IBaseErrorResponse>(),
    Logout: emptyProps(),
    'Logout Success Response': emptyProps(),
    'Logout Error Response': props<IBaseErrorResponse>(),
    'Load User': emptyProps(),
  },
})
