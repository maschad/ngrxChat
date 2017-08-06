import {ApplicationState} from "../store/application-state";
import * as _ from 'lodash';
import {MessageVM} from "./message.vm";
import {Message} from "../../../shared/model/message";
/**
 * Created by carlos on 8/5/17.
 */


export function messagesSelector(state:ApplicationState): MessageVM[] {

    const currentThreadId = state.uiState.currentThreadId;

    if(!currentThreadId){
        return [];
    }

    const messageIds = state.storeData.threadsPerUser[currentThreadId].messageIds;

    const messages  = messageIds.map(messageId => state.storeData.messages[messageId]);

    return messages.map(_.partial(mapMessagesToMessageVM,state));


}


function mapMessagesToMessageVM(state:ApplicationState, message:Message): MessageVM {

    return {
        id: message.id,
        participantName: state.storeData.participants[message.participantId].name,
        timestamp: message.timestamp,
        text: message.text,
    };
}