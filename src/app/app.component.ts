import { ClearCompletedQueueItems, CompleteQueuedRequest } from './shared/actions/queue.actions';
import { Reconnected } from './shared/actions/shared.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnlineStatusType } from './online-status/online-status-type.enum';
import { OnlineStatusService } from './online-status/online-status.service';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { UpdateOnlineStatus } from './shared/actions/online-status.action';
import { OnlineStatusState } from './shared/state/online-status.state';
import { Observable, forkJoin } from 'rxjs';
import { QueueState } from './shared/state/queue.state';
import { ErrorQueue } from './shared/models/error-queue.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(OnlineStatusState.getOnlineStatus) onlineStatus$: Observable<OnlineStatusType>;
  @Select(QueueState.getErrorQueue) errorQueue$: Observable<ErrorQueue[]>;

  private onlineStatus: OnlineStatusType;
  private errorQueue: ErrorQueue[];

  constructor(private store: Store, private onlineStatusService: OnlineStatusService, private http: HttpClient){
    this.store.dispatch(new UpdateOnlineStatus(OnlineStatusType.ONLINE));
  }

  ngOnInit(){
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.store.dispatch(new UpdateOnlineStatus(status));
    });

    this.onlineStatus$.subscribe(os => {
      this.onlineStatus = os;
      if(this.onlineStatus === OnlineStatusType.ONLINE && this.errorQueue && this.errorQueue.length > 0){
        this.resendAjaxRequests();
      }
    });

    this.errorQueue$.subscribe(eq => {
      this.errorQueue = eq
      if(this.onlineStatus === OnlineStatusType.ONLINE && eq.length > 0){
        this.resendAjaxRequests();
      }
    });
  }

  resendAjaxRequests(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    if(this.errorQueue){
      let requests = [];
      this.errorQueue.forEach(eq => {
        switch(eq.method){
          case "DELETE":
            requests.push(this.http.delete(eq.url).pipe(
              tap((result) => {
                this.store.dispatch(new CompleteQueuedRequest(eq.body));
              })));
            break;
          case "POST":
            requests.push(this.http.post(eq.url, eq.body, httpOptions).pipe(
              tap((result) => {
                this.store.dispatch(new CompleteQueuedRequest(eq.body));
              })));
            break;
          case "PUT":
          default:
            requests.push(this.http.put(eq.url, eq.body, httpOptions).pipe(
              tap((result) => {
                this.store.dispatch(new CompleteQueuedRequest(eq.body));
              })));
            break;
        }
      });

      forkJoin(requests).subscribe(results => {
        this.store.dispatch([new ClearCompletedQueueItems(), new Reconnected()]);
      });

    }else{
      this.store.dispatch(new Reconnected());
    }
  }
}
