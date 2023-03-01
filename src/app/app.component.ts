import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { actions, IAppStore } from '@store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppStore>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.loadUser())
  }
}
