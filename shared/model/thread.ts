/**
 * Created by carlos on 7/18/17.
 */

export interface Thread {
    id:number;
    messageIds:number[];
    participants: {[key: number] : number}
}