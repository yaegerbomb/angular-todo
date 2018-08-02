import { OnlineStatusType } from '../../online-status/online-status-type.enum';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateOnlineStatus } from '../actions/online-status.action';


export interface OnlineStatusStateModel {
    onlineStatus: OnlineStatusType;
}


@State<OnlineStatusStateModel>({
    name: 'onlineStatus',
    defaults: {
        onlineStatus: OnlineStatusType.ONLINE
    }
})

export class OnlineStatusState {
    constructor(){}

    @Selector()
    static getOnlineStatus(state: OnlineStatusStateModel){
        return state.onlineStatus;
    }

    @Action(UpdateOnlineStatus)
    UpdateOnlineStatus({patchState} : StateContext<OnlineStatusStateModel>, { payload } : UpdateOnlineStatus){
        patchState({
            onlineStatus: payload
        });
    }
}