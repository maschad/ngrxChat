/**
 * Created by carlos on 7/19/17.
 */

export interface UiState {
    userId:number
    currentThreadId:number
}

export const INITIAL_UI_STATE:UiState = {
    userId: 1,
    currentThreadId: undefined
};