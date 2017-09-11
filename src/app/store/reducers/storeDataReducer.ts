import {StoreData, INITIAL_STORE_DATA_STATE} from "../store-data";
import {Action} from "@ngrx/store";
import {
    UserThreadsLoadedAction, USER_THREADS_LOADED_ACTION, SEND_NEW_MESSAGE_ACTION,
    SendNewMessageAction, NEW_MESSAGES_RECEIVED_ACTION, NewMessagesReceivedAction
} from "../actions";
import * as _ from "lodash";
import {tassign} from "tassign";
import {Message} from "../../../../shared/model/message";

/**
 * Created by carlos on 8/5/17.
 */

const uuid = require('uuid/V4');

export function storeData(state: StoreData = INITIAL_STORE_DATA_STATE, action: Action): StoreData {

    switch (action.type) {

        case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction(state, <UserThreadsLoadedAction>action);

        case SEND_NEW_MESSAGE_ACTION:
            return handleSendNewMessageAction(state, <SendNewMessageAction>action);

        case NEW_MESSAGES_RECEIVED_ACTION:
            return handleNewMessagesReceivedAction(state, <NewMessagesReceivedAction>action);

        default:
            return state;
    }
}

function handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction): StoreData {

    return {
        participants: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id'),
        threadsPerUser: _.keyBy(action.payload.threads, 'id')
    };

}

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction): StoreData {
    const newState = _.cloneDeep(state);

    const currentThread = newState.threadsPerUser[action.payload.threadId];

    const newMessage: Message = {
        text: action.payload.text,
        threadId: action.payload.threadId,
        timestamp: new Date().getTime(),
        participantId: action.payload.participantId,
        id:uuid()
    };

    currentThread.messageIds.push(newMessage.id);

    newState.messages[newMessage.id] = newMessage;

    return newState;
}

function handleNewMessagesReceivedAction(state: StoreData, action: NewMessagesReceivedAction): StoreData {

    const newState = _.cloneDeep(state);

    const newMessages = action.payload.unreadMessages,
            currentThreadId = action.payload.currentThreadId,
            currentUserId = action.payload.currentUserId;

    newMessages.forEach(newMessage => {
        newState.messages[newMessage.id] = newMessage;
        newState.threadsPerUser[newMessage.threadId].messageIds.push(newMessage.id);

        if(newMessage.threadId !== currentThreadId){
            newState.threadsPerUser[newMessage.threadId].participants[currentUserId]++;
        }
    });

    return newState;

}

