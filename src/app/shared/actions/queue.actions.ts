import { ErrorQueue } from '../models/error-queue.model';

export class PushErrorToQueue {
    static readonly type = '[push-error-to-queue] failed http request';
    constructor(public payload: ErrorQueue){

    }
}

export class ClearCompletedQueueItems{
    static readonly type = '[clear-complted-queued-items] clear error queue';
}

export class CompleteQueuedRequest{
    static readonly type = '[complete-queued-request] complete error queue request';
    constructor(public payload: ErrorQueue){

    }
}