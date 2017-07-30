import {ApplicationState} from "../store/application-state";
/**
 * Created by carlos on 7/30/17.
 */

export function mapStateToUserName(state: ApplicationState): string {
    return state.storeData.participants[state.uiState.userId].name;
}
