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
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction} from "./store/actions";
import {tassign} from "tassign";

export function storeReducer(state: ApplicationState, action:Action): ApplicationState {

    switch (action.type){
        case LOAD_USER_THREADS_ACTION:
            return handleLoadUserThreadsAction(state,action.payload);

        default:
            return state;
    }

}


function handleLoadUserThreadsAction(state: ApplicationState, action:LoadUserThreadsAction):ApplicationState {

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
    StoreModule.provideStore(storeReducer, INITIAL_APPLICATION_STATE)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
