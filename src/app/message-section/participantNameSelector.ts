import {ApplicationState} from "../store/application-state";
import {buildThreadParticipantsList} from "./buildThreadParticipantsList";
/**
 * Created by carlos on 8/5/17.
 */


export function participantNameSelector(state:ApplicationState): string {
    const currentThreadId = state.uiState.currentThreadId;

    if(!currentThreadId){
        return "";
    }

    const currentThread = state.storeData.threadsPerUser[currentThreadId];
    return buildThreadParticipantsList(state, currentThread);
}