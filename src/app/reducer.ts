

import {ApplicationState} from "./store/application-state";
import {Action, combineReducers} from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";
import {storeData} from "./store/reducers/storeDataReducer";
import {uiState} from "./store/reducers/uiStateReducer";
import {storeFreeze} from "ngrx-store-freeze";
import {compose} from "@ngrx/core/compose";

export const combinedReducer = compose(storeFreeze, combineReducers)({uiState,storeData, router: routerReducer});


export function storeReducer(state: ApplicationState, action: Action) {
    return combinedReducer(state, action);
}