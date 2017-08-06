import {StoreData, INITIAL_STORE_DATA_STATE} from "../store-data";
import {Action} from "@ngrx/store";
import {UserThreadsLoadedAction, USER_THREADS_LOADED_ACTION} from "../actions";
import * as _ from "lodash";

/**
 * Created by carlos on 8/5/17.
 */

export function storeData(state: StoreData = INITIAL_STORE_DATA_STATE, action:Action): StoreData {

    switch (action.type){

        case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction(state, <UserThreadsLoadedAction>action);

        default:
            return state;
    }
}

function handleLoadUserThreadsAction(state: StoreData, action:UserThreadsLoadedAction):StoreData {

    return {
        participants: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
        threadsPerUser: _.keyBy(action.payload.threads, 'id')
    };

}

