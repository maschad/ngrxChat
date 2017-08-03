import {ApplicationState} from "../store/application-state";
import {Thread} from "../../../shared/model/thread";
import {ThreadSummaryVM} from "./thread-summary.vm";
import * as _ from 'lodash';

/**
 * Created by carlos on 7/31/17.
 */

export function stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
    const threads = _.values<Thread>(state.storeData.threadsPerUser);

    return threads.map(_.partial(mapThreadToThreadSummary,state));
}

function mapThreadToThreadSummary(state:ApplicationState, thread:Thread): ThreadSummaryVM {

    const names = _.keys(thread.participants).map(participantId => state.storeData.participants[participantId].name);

    const lastMessageId = _.last(thread.messageIds);
    const lastMessage = state.storeData.messages[lastMessageId];

    return {
        id: thread.id,
        participantNames: _.join(names, ","),
        lastMessageText: lastMessage.text,
        timestamp: lastMessage.timestamp
    };
}