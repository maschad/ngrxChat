import {Thread} from "../../../shared/model/thread";
import {ApplicationState} from "../store/application-state";

import * as _ from 'lodash';

/**
 * Created by carlos on 7/30/17.
 */

export function mapStateToUnreadMessagesCounter(state: ApplicationState): number {
    const currentUserId = state.uiState.userId;

    return _.values<Thread>(state.storeData.threadsPerUser)
        .reduce(
            (acc,thread) => acc + (thread.participants[currentUserId] || 0),
            0);
}
