import {UiState, INITIAL_UI_STATE} from "../ui-state";
import {Action} from "@ngrx/store";
import {THREAD_SELECTED_ACTION, SELECT_USER_ACTION, SelectUserAction} from "../actions";
import {tassign} from "tassign";
/**
 * Created by carlos on 8/5/17.
 */


export function uiState(state: UiState = INITIAL_UI_STATE, action:Action): UiState {

    switch (action.type){

        case THREAD_SELECTED_ACTION:

            const newState = tassign(state);

            newState.currentThreadId = action.payload.selectedThreadId;

            return newState;

        case SELECT_USER_ACTION:
            return handleSelectUserAction(state,action);

        default:
            return state;
    }
}


function handleSelectUserAction(state: UiState, action: SelectUserAction){
    const newUiState = tassign(state);

    newUiState.userId = action.payload;
    newUiState.currentThreadId = undefined;

    return newUiState;
}