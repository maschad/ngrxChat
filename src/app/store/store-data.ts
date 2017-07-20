import {Participant} from "../../../shared/model/participant";
import {Thread} from "../../../shared/model/thread";
import {Message} from "../../../shared/model/message";
/**
 * Created by carlos on 7/19/17.
 */

export interface StoreData {
    participants: {[key:number]: Participant}
    threadsPerUser: {[key:number]: Thread}
    messages: {[key:number]: Message}
}

export const INITIAL_STORE_DATA_STATE:StoreData = {
    participants: {},
    threadsPerUser: {},
    messages: {}

};