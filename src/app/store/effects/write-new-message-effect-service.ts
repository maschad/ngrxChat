

import {Actions, Effect} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {ThreadsService} from "../../services/threads.service";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {SEND_NEW_MESSAGE_ACTION} from "../actions";

@Injectable()
export class WriteNewMessageEffectService {
    constructor(private action$:Actions, private threadService: ThreadsService){}

    @Effect({dispatch:false})
    newMessages$: Observable<any> = this.action$
        .ofType(SEND_NEW_MESSAGE_ACTION)
        .switchMap(action => this.threadService.saveNewMessage(action.payload));
}