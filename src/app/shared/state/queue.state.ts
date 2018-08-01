import { PushErrorToQueue, ClearCompletedQueueItems, CompleteQueuedRequest } from '../actions/queue.actions';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { ErrorQueue } from '../models/error-queue.model';

export interface QueueStateModel {
    errorQueue: ErrorQueue[];
}


@State<QueueStateModel>({
    name: 'queue',
    defaults: {
        errorQueue: []
    }
})

export class QueueState {
    constructor(){}

    @Selector()
    static getErrorQueue(state: QueueStateModel){
        return state.errorQueue;
    }

    @Action(PushErrorToQueue)
    PushError({patchState, getState} : StateContext<QueueStateModel>, { payload } : PushErrorToQueue){
        const state = getState();
        let errorQueue = state.errorQueue;
        
        //see if we already have the method and payload in queue
        const jsonPayload = JSON.stringify(payload);
        let found = errorQueue.find(eq => JSON.stringify(eq) === jsonPayload);
        
        if(!found){
            errorQueue.push(payload);
            patchState({
                errorQueue: errorQueue
            });
        }
    }

    @Action(ClearCompletedQueueItems)
    ClearErrorQueue({ patchState, getState } : StateContext<QueueStateModel>, { } : ClearCompletedQueueItems){
        let indexesToRemove = [];
        let errorQueue = getState().errorQueue;
        errorQueue.forEach((eq, eqIndex) => {
            if(eq.completed){
                indexesToRemove.push(eqIndex);
            }
        })
        indexesToRemove.reverse().forEach(eqIndex => {
            errorQueue.splice(eqIndex, 1);
        })
        patchState({
            errorQueue: errorQueue
        });
    }

    @Action(CompleteQueuedRequest)
    CompleteRequest({patchState, getState} : StateContext<QueueStateModel>, { payload } : CompleteQueuedRequest){
        const errorQueue = getState().errorQueue;
        let eqToModifyIndex = errorQueue.findIndex(eq => eq.body === payload);
        errorQueue[eqToModifyIndex].completed = true;
        patchState({
            errorQueue: errorQueue
        });
    }
}