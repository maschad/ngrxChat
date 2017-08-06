import {ApplicationState} from "../store/application-state";
import {Thread} from "../../../shared/model/thread";
import * as _ from "lodash";
/**
 * Created by carlos on 8/5/17.
 */

export function buildThreadParticipantsList(state:ApplicationState, currentThread: Thread): string {

    const names = _.keys(currentThread.participants).map(
        participantId => state.storeData.participants[participantId].name);

    return _.join(names, ",")

}