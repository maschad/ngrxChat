import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as _ from "lodash";

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import {ThreadsService} from "./services/threads.service";
import {HttpModule} from "@angular/http";
import {StoreModule, Action} from "@ngrx/store";
import {INITIAL_APPLICATION_STATE, ApplicationState} from "./store/application-state";
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from "./store/actions";
import {tassign} from "tassign";
import {EffectsModule} from "@ngrx/effects";
import {LoadThreadsEffectService} from "./store/effects/load-threads-effect.service";

export function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action:Action): ApplicationState {

    switch (action.type){
        case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction(state, <UserThreadsLoadedAction>action);

        default:
            return state;
    }

}


function handleLoadUserThreadsAction(state: ApplicationState, action:UserThreadsLoadedAction):ApplicationState {

        const userData = action.payload;

        const newState: ApplicationState = tassign(state);


        newState.storeData = {
            participants: _.keyBy(action.payload.participants, 'id'),
            messages: _.keyBy(action.payload.messages, 'id'),
            threadsPerUser: _.keyBy(action.payload.threads, 'id')

        };

        return newState;
}


@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    MessageListComponent,
    ThreadListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(storeReducer, INITIAL_APPLICATION_STATE),
    EffectsModule.run(LoadThreadsEffectService)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
