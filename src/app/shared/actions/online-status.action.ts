import { OnlineStatusType } from "../modules/online-status/online-status-type.enum";

export class UpdateOnlineStatus {
    static readonly type = '[online-status] update online status';
    constructor(public payload: OnlineStatusType){

    }
}