import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {Observable} from "rxjs";
import {MessageVM} from "./message.vm";
import {participantNameSelector} from "./participantNameSelector";
import {messagesSelector} from "./messagesSelector";
import {SendNewMessageAction} from "../store/actions";
import {UiState} from "../store/ui-state";
import {tassign} from "tassign";

@Component({
    selector: 'message-section',
    templateUrl: './message-section.component.html',
    styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

    participantNames$: Observable<string>;
    messages$: Observable<MessageVM[]>;
    uiState: UiState;

    constructor(private store: Store<ApplicationState>) {

        this.participantNames$ = store.select(participantNameSelector);

        this.messages$ = store.select(messagesSelector);

        store.subscribe(state =>  this.uiState = tassign(state.uiState));
    }

    ngOnInit() {
    }

    onNewMessage(input: any) {

        this.store.dispatch(new SendNewMessageAction({
            text: input.value,
            threadId: this.uiState.currentThreadId,
            participantId: this.uiState.userId
        }));
        input.value = '';

    }

}
