import {Action} from "@ngrx/store";
import {AllUserData} from "../../../shared/to/all-user-data";
/**
 * Created by carlos on 7/20/17.
 */

export const USER_THREADS_LOADED_ACTION = 'USER_THREADS_LOADED_ACTION';
export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';

export class LoadUserThreadsAction implements Action {

    readonly type:string = LOAD_USER_THREADS_ACTION;

}

export class UserThreadsLoadedAction implements Action {

    readonly type:string = USER_THREADS_LOADED_ACTION;

    constructor(public payload?:AllUserData){}

}
