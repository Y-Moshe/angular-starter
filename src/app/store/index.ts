import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule, ActionReducerMap } from '@ngrx/store'

import { AuthEffects } from './effects/auth'
import authReducer, { IAuthState } from './reducers/auth'
import authActions from './actions/auth'
import authSelectors from './selectors/auth'

export interface IAppStore {
  authState: IAuthState
}

const reducers: ActionReducerMap<IAppStore> = {
  authState: authReducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}

export const actions = {
  ...authActions,
}

export const selectors = {
  ...authSelectors,
}
