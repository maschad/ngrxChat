import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {ThreadSelectedAction} from "../store/actions";
import {Observable} from "rxjs";
import {ThreadSummaryVM} from "./thread-summary.vm";
import {mapStateToUnreadMessagesCounter} from "./mapStateToUnreadMessagesCounter";
import {stateToThreadSummariesSelector} from "./stateToThreadSummariesSelector";
import {userNameSelector} from "./userNameSelector";

@Component({
    selector: 'thread-section',
    templateUrl: './thread-section.component.html',
    styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

    userName$: Observable<string>;
    unreadMessagesCounter$: Observable<number>;
    threadSummaries$: Observable<ThreadSummaryVM[]>;
    currentSelectedThread$ : Observable<number>;

    constructor(private store: Store<ApplicationState>) {
        this.userName$ = store.select(userNameSelector);

        this.unreadMessagesCounter$ = store.map(mapStateToUnreadMessagesCounter);
        
        this.threadSummaries$ = store.select(stateToThreadSummariesSelector);

        this.currentSelectedThread$ = store.select(state => state.uiState.currentThreadId);
    }


    onThreadSelected(selectedThreadId:number){
        this.store.dispatch(new ThreadSelectedAction(selectedThreadId))

    }

}
