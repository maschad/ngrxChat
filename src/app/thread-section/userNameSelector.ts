import {ApplicationState} from "../store/application-state";
/**
 * Created by carlos on 7/30/17.
 */

export function userNameSelector(state: ApplicationState): string {
    const currentUserId = state.uiState.userId,
        currentParticipant = state.storeData.participants[currentUserId];

    if(!currentParticipant){
        return "";
    }

    return currentParticipant.name;
}
