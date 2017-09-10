import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import {ThreadsService} from "./services/threads.service";
import {HttpModule} from "@angular/http";
import {StoreModule, combineReducers} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {LoadThreadsEffectService} from "./store/effects/load-threads-effect.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {INITIAL_APPLICATION_STATE} from "./store/application-state";
import {storeReducer} from "./reducer";



@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    MessageListComponent,
    ThreadListComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.run(LoadThreadsEffectService),
    HttpModule,
    StoreModule.provideStore(storeReducer, INITIAL_APPLICATION_STATE),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
