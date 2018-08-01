import { OnlineStatusModule } from './online-status/online-status.module';
import { QueueState } from './shared/state/queue.state';
import { HttpRequestInterceptor } from './shared/interceptors/http-request.interceptor';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FormsModule }   from '@angular/forms';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ToDoState } from './shared/state/todos.state';
import { AppRoutingModule } from './app-routing.module';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';
import { EditTodoComponent } from './todos/edit-todo/edit-todo.component';
import { OnlineStatusState } from './shared/state/online-status.state';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    AddTodoComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OnlineStatusModule,
    NgxsModule.forRoot([
      ToDoState,
      QueueState,
      OnlineStatusState
    ]),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
