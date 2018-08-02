import { PushErrorToQueue } from '../actions/queue.actions';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorQueue } from '../models/error-queue.model';
import { InterceptorHttpParams } from './interceptor-http-params';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor{
    constructor(private store: Store){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request;
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {}, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    // do error handling here
                    if(request.method !== "GET"){
                        if (request.params instanceof InterceptorHttpParams){
                            //queue our method
                            this.store.dispatch(new PushErrorToQueue(
                                new ErrorQueue(
                                    request.method,
                                    request.urlWithParams,
                                    request.body,
                                    request.headers,
                                    request.params.interceptorConfig.type,
                                    err
                                )
                            ))
                        }

                    }
                }
        }));
    }
}