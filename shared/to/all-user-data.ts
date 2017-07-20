import {Participant} from "../model/participant";
import {Thread} from "../model/thread";
import {Message} from "../model/message";
/**
 * Created by carlos on 7/18/17.
 */

export interface AllUserData {
    participants: Participant[];
    threads: Thread[];
    messages: Message[];
}