

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ThreadsService} from "../../services/threads.service";
import {Effect} from "@ngrx/effects";
import {NewMessagesReceivedAction} from "../actions";
import {ApplicationState} from "../application-state";
import {Store} from "@ngrx/store";
import {UiState} from "../ui-state";

@Injectable()
export class ServerNotificationsEffect {

    constructor(private threadsService:ThreadsService, private store: Store<ApplicationState>){}

    @Effect()
    newMessages$ = Observable.interval(3000)
        .withLatestFrom(this.store.select<UiState>("uiState"))
        .map(([any,uiState]) => uiState)
        .filter(uiState => Boolean(uiState.userId))
        .switchMap((uiState) => this.threadsService.loadMessagesForUser(uiState.userId))
        .map(messages => new NewMessagesReceivedAction(messages))
}